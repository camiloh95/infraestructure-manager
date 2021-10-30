import * as AWS from '@aws-sdk/client-dynamodb';
import config from '@config';

export class AWSDynamoDBProvider {
  public async getAllItemsTable(tableName: string) {
    const client = new AWS.DynamoDB({
      region: config.aws.region,
      credentials: {
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey,
      },
    });

    const command = new AWS.ScanCommand({ TableName: tableName });
    const response = await client.send(command);

    return response.Items;
  }
}
