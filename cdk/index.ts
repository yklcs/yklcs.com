import * as cdk from "aws-cdk-lib"
import { StaticSiteStack } from "./static-site.js"
import { CertStack } from "./cert.js"

const app = new cdk.App()

const certStack = new CertStack(app, "yklcs-cert", {
	domain: app.node.tryGetContext("domain"),
	crossRegionReferences: true,
	env: {
		account: process.env.CDK_DEFAULT_ACCOUNT,
		region: "us-east-1",
	},
})

const staticSiteStack = new StaticSiteStack(app, "yklcs", {
	domain: app.node.tryGetContext("domain"),
	crossRegionReferences: true,
	cert: certStack.cert,
	env: {
		account: process.env.CDK_DEFAULT_ACCOUNT,
		region: process.env.CDK_DEFAULT_REGION,
	},
})

app.synth()
