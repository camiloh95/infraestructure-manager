import config from '@config';
import * as AWS from '@aws-sdk/client-cloudformation';

export class AWSStackProvider {
  public async createStack(applicationName: string, template: string, parameters: any) {
    const client = new AWS.CloudFormation({
      region: config.aws.region,
      credentials: {
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey,
      },
    });

    const params = {
      StackName: applicationName,
      TemplateBody: template,
      Parameters: parameters
    };

    const command = new AWS.CreateStackCommand(params);
    const response = await client.send(command);

    return response;
  }

  public async deleteStack(applicationName: string) {
    const client = new AWS.CloudFormation({
      region: config.aws.region,
      credentials: {
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey,
      },
    });

    const params = {
      StackName: applicationName,
    };

    const command = new AWS.DeleteStackCommand(params);
    const response = await client.send(command);

    return response;
  }
}