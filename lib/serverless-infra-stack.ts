import * as cdk from '@aws-cdk/core';
import * as nodejs from '@aws-cdk/aws-lambda-nodejs'

// :: ---

export class ServerlessInfraStack extends cdk.Stack {
  // :: ---
  // :: scope === parent
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new nodejs.NodejsFunction(this, 'my-cdk-function', {
      entry: 'src/code/lambda/my-cdk-function.ts',
      memorySize: 1024 // :: in MB
    })
  }
}
