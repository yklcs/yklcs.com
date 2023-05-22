import * as cdk from "aws-cdk-lib"
import { StaticSite } from "./static-site.js"

/**
 * This stack relies on getting the domain name from CDK context.
 * Use 'cdk synth -c domain=mystaticsite.com -c subdomain=www'
 * Or add the following to cdk.json:
 * {
 *   "context": {
 *     "domain": "mystaticsite.com",
 *     "altDomains": ["www.mystaticsite.com"],
 *     "accountId": "1234567890",
 *   }
 * }
 **/
class StaticSiteStack extends cdk.Stack {
  constructor(parent: cdk.App, name: string, props: cdk.StackProps) {
    super(parent, name, props)

    new StaticSite(this, "StaticSite", {
      domain: this.node.tryGetContext("domain"),
      altDomains: this.node.tryGetContext("altDomains") ?? [],
    })
  }
}

const app = new cdk.App()

new StaticSiteStack(app, "StaticSiteStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    /**
     * Stack must be in us-east-1, because the ACM certificate for a
     * global CloudFront distribution must be requested in us-east-1.
     */
    region: "us-east-1",
  },
})

app.synth()
