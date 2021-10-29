import { ServerService } from '.';
import { RequestHandler } from 'express';

export class ServerController {
  createECSInstance: RequestHandler = async (req, res, next) => {
    try {
      const aServerService = new ServerService();
      const { application_name: applicationName } = req.body;
      const response = await aServerService.createECSInstance(applicationName);
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }
}