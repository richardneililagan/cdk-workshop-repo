import * as cdk from '@aws-cdk/core'
import * as nodejs from '@aws-cdk/aws-lambda-nodejs'
import * as iam from '@aws-cdk/aws-iam'
import * as ddb from '@aws-cdk/aws-dynamodb'

// :: ---

export interface DDBTableWriterProps {
  table: ddb.Table
}

export class DDBTableWriter extends cdk.Construct {
  constructor (scope: cdk.Construct, id: string, props: DDBTableWriterProps) {
    super(scope, id)
    
    const functionRole = new iam.Role(this, 'my-cdk-function-role', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com')
    })
    
    const fn = new nodejs.NodejsFunction(this, 'my-cdk-function', {
      entry: 'src/code/lambda/my-cdk-function.ts',
      memorySize: 1024, // :: in MB
      role: functionRole, // :: TODO
      environment: {
        TABLE_NAME: props.table.tableName
      }
    })
    
    // :: give permissions to role
    props.table.grantWriteData(functionRole)
  }
}