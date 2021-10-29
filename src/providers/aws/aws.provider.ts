import fs from 'fs';
import config from 'config';
import { CloudFormationClient, CreateStackCommand } from '@aws-sdk/client-cloudformation';

import * as hooks from './hooks';

export class AWSProvider {
  public async createECSInstance(applicationName: string) {
    const client = new CloudFormationClient({
      region: config.aws.region,
      credentials: {
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey,
      }
    });

    const template = fs.readFileSync('./src/providers/aws/templates/ecs.template.yaml', 'utf8');
    const parameters = hooks.getECSParameters(applicationName);

    const params = {
      StackName: applicationName,
      TemplateBody: template,
      Parameters: parameters
    };

    const command = new CreateStackCommand(params);

    const response = await client.send(command)
    return response;
  }
}