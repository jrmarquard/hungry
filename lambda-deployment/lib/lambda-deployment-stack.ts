import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import * as path from 'path';

export type LambdaDeploymentStackProps = {
  eventBusArn: string;
  eventSource: string;
  eventDetailType: string;
  lambdaEnv: Record<string, string>;
} & StackProps;

export class LambdaDeploymentStack extends Stack {
  constructor(scope: Construct, id: string, props: LambdaDeploymentStackProps) {
    super(scope, id, props);

    const entry = path.join(
      this.rootDir,
      'src/event_handlers/handleMessage.lambda.ts'
    );
    const depsLockFilePath = path.join(this.rootDir, 'yarn.lock');
    const tsconfig = path.join(this.rootDir, 'tsconfig.json');

    const lambdaFunction = new NodejsFunction(this, 'HandleMessage', {
      entry,
      depsLockFilePath,
      bundling: {
        sourceMap: true,
        tsconfig,
      },
      runtime: Runtime.NODEJS_16_X,
      logRetention: RetentionDays.THREE_MONTHS,
      environment: { ...props.lambdaEnv },
      timeout: Duration.seconds(31),
    });

    const rule = new events.Rule(this, 'rule', {
      eventBus: events.EventBus.fromEventBusName(
        this,
        'EventBus',
        props.eventBusArn
      ),
      eventPattern: {
        source: [props.eventSource],
        detailType: [props.eventDetailType],
      },
    });

    rule.addTarget(
      new targets.LambdaFunction(lambdaFunction, {
        retryAttempts: 1,
      })
    );
  }

  get rootDir() {
    return path.join(__dirname, '../../');
  }
}
