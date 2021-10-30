import fs from 'fs';
import { AWSStackProvider } from 'providers/aws/aws.stack.provider';

import * as hooks from './hooks';

export class ServerService {
  public async createECSInstance(applicationName: string) {
    const aAWSStackProvider = new AWSStackProvider();
    const parameters = hooks.getECSParameters(applicationName);
    const template = fs.readFileSync('./src/providers/aws/templates/ecs.template.yaml', 'utf8');
    const response = await aAWSStackProvider.createStack(applicationName, template, parameters);
    return response;
  }

  public async deleteECSInstance(applicationName: string) {
    const aAWSStackProvider = new AWSStackProvider();
    const response = await aAWSStackProvider.deleteStack(applicationName);
    return response;
  }
}