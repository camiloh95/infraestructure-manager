import { AWSProvider } from "providers/aws/aws.provider";

export class ServerService {
  public async createECSInstance(applicationName: string) {
    const aAWSProvider = new AWSProvider();
    const response = await aAWSProvider.createECSInstance(applicationName);
    return response;
  }
}