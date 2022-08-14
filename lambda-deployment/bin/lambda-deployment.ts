#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LambdaDeploymentStack } from '../lib/lambda-deployment-stack';
import * as dotenv from 'dotenv';

dotenv.config();

const app = new cdk.App();
new LambdaDeploymentStack(app, process.env.STACK_NAME as string, {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */

  /* Stack Configuration */
  eventBusArn: process.env.EVENT_BUS_ARN as string,
  eventSource: process.env.EVENT_SOURCE as string,
  eventDetailType: process.env.EVENT_DETAIL_TYPE as string,

  /* Runtime variables. */
  lambdaEnv: {
    DISCBOT_TOKEN: process.env.DISCBOT_TOKEN as string,
  },
});
