import * as acm from "aws-cdk-lib/aws-certificatemanager"
import * as route53 from "aws-cdk-lib/aws-route53"
import { Stack, App, type StackProps } from "aws-cdk-lib"

export interface CertProps extends StackProps {
  domain: string
  altDomains?: string[]
}

export class CertStack extends Stack {
  cert: acm.Certificate

  constructor(parent: App, name: string, props: CertProps) {
    super(parent, name, props)
    this.cert = new acm.Certificate(this, "Certificate", {
      domainName: props.domain,
      subjectAlternativeNames: props.altDomains,
      validation: acm.CertificateValidation.fromDns(
        route53.HostedZone.fromLookup(this, "Zone", {
          domainName: props.domain,
        })
      ),
    })
  }
}
