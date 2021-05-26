import { v4 as uuid } from 'uuid'
import { DynamoDB } from 'aws-sdk'

// :: ---

const ddb = new DynamoDB.DocumentClient()

exports.handler = async (event: unknown) => {
    // :: TODO write code that saves to provided DynamoDB table
    
    const payload = {
        TableName: process.env.TABLE_NAME, // <-- what table are we saving to?
        Item: {
            id: uuid()
        }
    }
    
    await ddb.put(payload).promise()
    
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from my workshop AWS account!'),
    };
    return response;
}
