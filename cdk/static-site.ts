import * as route53 from "aws-cdk-lib/aws-route53"
import * as s3 from "aws-cdk-lib/aws-s3"
import * as acm from "aws-cdk-lib/aws-certificatemanager"
import * as cloudfront from "aws-cdk-lib/aws-cloudfront"
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment"
import * as targets from "aws-cdk-lib/aws-route53-targets"
import * as cloudfront_origins from "aws-cdk-lib/aws-cloudfront-origins"
import { CfnOutput, Duration, RemovalPolicy, Stack } from "aws-cdk-lib"
import * as iam from "aws-cdk-lib/aws-iam"
import { Construct } from "constructs"

import path from "node:path"
import { fileURLToPath } from "node:url"

export interface StaticSiteProps {
  domain: string
  altDomains?: string[]
}

/**
 * Static site infrastructure, which deploys site content to an S3 bucket.
 *
 * The site redirects from HTTP to HTTPS, using a CloudFront distribution,
 * Route53 alias record, and ACM certificate.
 */
export class StaticSite extends Construct {
  constructor(parent: Stack, name: string, props: StaticSiteProps) {
    super(parent, name)

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

    const certificate = new acm.Certificate(this, "SiteCertificate", {
      domainName: props.domain,
      subjectAlternativeNames: props.altDomains,
    })

    new CfnOutput(this, "Certificate", { value: certificate.certificateArn })

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
      certificate: certificate,
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
