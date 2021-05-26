import * as cdk from '@aws-cdk/core';
import * as nodejs from '@aws-cdk/aws-lambda-nodejs'
import * as ddb from '@aws-cdk/aws-dynamodb'
import * as iam from '@aws-cdk/aws-iam'

import { DDBTableWriter } from './constructs/ddb-table-writer'

// :: ---

export interface ServerlessInfraStackProps extends cdk.StackProps {
  //
}

export class ServerlessInfraStack extends cdk.Stack {
  // :: ---
  // :: scope === parent
  constructor(scope: cdk.Construct, id: string, props?: ServerlessInfraStackProps) {
    super(scope, id, props);
    
    // :: our DDB table
    const table = new ddb.Table(this, 'my-ddb-table', {
      partitionKey: {
        name: 'new-id',
        type: ddb.AttributeType.STRING
      }
    })
    
    new DDBTableWriter(this, 'my-ddb-table-writer', {
      table: table
    })
  }
}
