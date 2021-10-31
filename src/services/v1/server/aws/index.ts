import fs from 'fs';
import { IResponse } from 'interfaces/IResponse';
import { AWSStackProvider } from 'providers/aws/aws.stack.provider';

import * as hooks from './hooks';

export class ServerService {
  public async createECSInstance(applicationName: string) : Promise<IResponse> {
    const aAWSStackProvider = new AWSStackProvider();

    const parameters = hooks.getECSParameters(applicationName);
    const template = fs.readFileSync('./src/providers/aws/templates/ecs.template.yaml', 'utf8');
    const response = await aAWSStackProvider.createStack(applicationName, template, parameters);

    return {
      data: response,
      status: 201,
    };
  }

  public async deleteECSInstance(applicationName: string) : Promise<IResponse> {
    const aAWSStackProvider = new AWSStackProvider();
    const response = await aAWSStackProvider.deleteStack(applicationName);

    return {
      data: response,
      status: 204,
    };
  }
}