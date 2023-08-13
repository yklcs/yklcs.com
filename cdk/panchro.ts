import {
  aws_ec2 as ec2,
  aws_cloudfront as cloudfront,
  aws_cloudfront_origins as cloudfront_origins,
  App,
  Stack,
  type StackProps,
} from "aws-cdk-lib"
import { OriginProtocolPolicy } from "aws-cdk-lib/aws-cloudfront"

export interface PanchroProps extends StackProps {
  cf: cloudfront.Distribution
}

export class PanchroStack extends Stack {
  instance: ec2.Instance

  constructor(parent: App, name: string, props: PanchroProps) {
    super(parent, name, props)

    const vpc = ec2.Vpc.fromLookup(this, "VPC", {
      isDefault: true,
    })

    const instanceType = ec2.InstanceType.of(
      ec2.InstanceClass.T4G,
      ec2.InstanceSize.SMALL
    )

    const securityGroup = new ec2.SecurityGroup(this, "SecurityGroup", {
      vpc,
      allowAllOutbound: true, // Can be set to false
    })
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22))
    securityGroup.addIngressRule(ec2.Peer.anyIpv6(), ec2.Port.tcp(22))
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80))
    securityGroup.addIngressRule(ec2.Peer.anyIpv6(), ec2.Port.tcp(80))
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443))
    securityGroup.addIngressRule(ec2.Peer.anyIpv6(), ec2.Port.tcp(443))

    const init = ec2.CloudFormationInit.fromConfigSets({
      configSets: {
        default: ["yumPreinstall", "config"],
      },
      configs: {
        yumPreinstall: new ec2.InitConfig([
          ec2.InitPackage.yum("go"),
          ec2.InitPackage.yum("git"),
        ]),
        config: new ec2.InitConfig([
          // Create a JSON file from tokens (can also create other files)
          ec2.InitSource.fromGitHub("panchro", "yklcs", "panchro"),
          ec2.InitCommand.shellCommand("", { cwd: "panchro" }),
        ]),
      },
    })

    this.instance = new ec2.Instance(this, "Instance", {
      vpc: vpc,
      instanceType: instanceType,
      machineImage: ec2.MachineImage.latestAmazonLinux2023(),
      keyName: "main",
      init: init,
    })

    const origin = new cloudfront_origins.HttpOrigin(
      this.instance.instancePublicDnsName,
      {
        protocolPolicy: OriginProtocolPolicy.HTTP_ONLY,
      }
    )
    props.cf.addBehavior("/photo*", origin, {
      compress: true,
      allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
    })
  }
}
