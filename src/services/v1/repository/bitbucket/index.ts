const attr = require('dynamodb-data-types').AttributeValue;
import { AWSDynamoDBProvider } from '@providers/aws/aws.dynamodb.provider';
import { BitbucketProvider } from '@providers/bitbucket/bitbucket.provider';
import { ICreateRepositoryParams } from 'interfaces/IBitbucket';
import { IResponse } from 'interfaces/IResponse';

export class RepositoryService {
  public async getAllRepositories(tableName: string) : Promise<IResponse> {
    const aAWSDynamoDbProvider = new AWSDynamoDBProvider();

    const response = await aAWSDynamoDbProvider.getAllItemsTable(tableName);
    const parseResponse = response?.map((item:any) => {
      return attr.unwrap(item);
    });

    return {
      data: parseResponse,
      status: 200,
    };
  }

  public async createRepository(params: ICreateRepositoryParams) : Promise<IResponse> {
    const aBitbucketProvider = new BitbucketProvider();

    const token = await aBitbucketProvider.getAuthToken();
    await aBitbucketProvider.createProject(token.access_token, params.project);
    const repository = await aBitbucketProvider.createRepository(token.access_token, params);

    return {
      data: repository,
      status: 201,
    };
  }
}