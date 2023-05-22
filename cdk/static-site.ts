import {
  aws_route53 as route53,
  aws_s3 as s3,
  aws_certificatemanager as acm,
  aws_cloudfront as cloudfront,
  aws_s3_deployment as s3deploy,
  aws_route53_targets as targets,
  aws_cloudfront_origins as cloudfront_origins,
  aws_iam as iam,
  App,
} from "aws-cdk-lib"

import {
  CfnOutput,
  Duration,
  RemovalPolicy,
  Stack,
  type StackProps,
} from "aws-cdk-lib"

import path from "node:path"
import { fileURLToPath } from "node:url"

export interface StaticSiteProps extends StackProps {
  cert: acm.Certificate
  domain: string
  altDomains?: string[]
}

/**
 * Static site infrastructure, which deploys site content to an S3 bucket.
 *
 * The site redirects from HTTP to HTTPS, using a CloudFront distribution,
 * Route53 alias record, and ACM certificate.
 */
export class StaticSiteStack extends Stack {
  constructor(parent: App, name: string, props: StaticSiteProps) {
    super(parent, name, props)

    const zone = route53.HostedZone.fromLookup(this, "Zone", {
      domainName: props.domain,
    })

    const cloudfrontOAC = new cloudfront.CfnOriginAccessControl(
      this,
      "CloudFrontOAC",
      {
        originAccessControlConfig: {
          name: `${props.domain}`,
          originAccessControlOriginType: "s3",
          signingBehavior: "always",
          signingProtocol: "sigv4",
        },
      }
    )

    new CfnOutput(this, "Site", { value: `https://${props.domain}` })

    // Content bucket
    const bucket = new s3.Bucket(this, "SiteBucket", {
      bucketName: props.domain,
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,

      /**
       * The default removal policy is RETAIN, which means that cdk destroy will not attempt to delete
       * the new bucket, and it will remain in your account until manually deleted. By setting the policy to
       * DESTROY, cdk destroy will attempt to delete the bucket, but will error if the bucket is not empty.
       */
      removalPolicy: RemovalPolicy.DESTROY, // NOT recommended for production code

      /**
       * For sample purposes only, if you create an S3 bucket then populate it, stack destruction fails.  This
       * setting will enable full cleanup of the demo.
       */
      autoDeleteObjects: true, // NOT recommended for production code
    })

    // CloudFront function
    const dir = path.dirname(fileURLToPath(import.meta.url))

    const viewerRequestFn = new cloudfront.Function(
      this,
      "ViewerRequestHandler",
      {
        code: cloudfront.FunctionCode.fromFile({
          filePath: path.join(dir, "viewer-request-handler.js"),
        }),
      }
    )

    const viewerResponseFn = new cloudfront.Function(
      this,
      "ViewerResponseHandler",
      {
        code: cloudfront.FunctionCode.fromFile({
          filePath: path.join(dir, "viewer-response-handler.js"),
        }),
      }
    )

    // CloudFront distribution
    const distribution = new cloudfront.Distribution(this, "SiteDistribution", {
      certificate: props.cert,
      defaultRootObject: "index.html",
      domainNames: [props.domain, ...(props.altDomains ?? [])],
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 403,
          responsePagePath: "/error.html",
          ttl: Duration.minutes(30),
        },
      ],
      defaultBehavior: {
        origin: new cloudfront_origins.S3Origin(bucket, {}),
        compress: true,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        functionAssociations: [
          {
            function: viewerRequestFn,
            eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
          },
          {
            function: viewerResponseFn,
            eventType: cloudfront.FunctionEventType.VIEWER_RESPONSE,
          },
        ],
      },
    })

    new CfnOutput(this, "DistributionId", {
      value: distribution.distributionId,
    })

    // Grant access to cloudfront
    bucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ["s3:GetObject"],
        resources: [bucket.arnForObjects("*")],
        principals: [new iam.ServicePrincipal("cloudfront.amazonaws.com")],
        conditions: {
          StringEquals: {
            "AWS:SourceArn": `arn:aws:cloudfront::${
              new iam.AccountRootPrincipal().accountId
            }:/${distribution.distributionId}`,
          },
        },
      })
    )
    new CfnOutput(this, "Bucket", { value: bucket.bucketName })

    // Route53 alias record for the CloudFront distribution
    new route53.ARecord(this, "SiteAliasRecord", {
      recordName: props.domain,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution)
      ),
      zone,
    })

    // Deploy site contents to S3 bucket
    new s3deploy.BucketDeployment(this, "DeployWithInvalidation", {
      sources: [s3deploy.Source.asset("./dist")],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ["/*"],
    })
  }
}
