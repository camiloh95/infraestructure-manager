import { ServerService } from '.';
import { RequestHandler } from 'express';

export class ServerController {
  createECSInstance: RequestHandler = async (req, res, next) => {
    try {
      const aServerService = new ServerService();
      const { application_name: applicationName } = req.body;
      const { status, data } = await aServerService.createECSInstance(applicationName);
      return res.status(status).json({ data });
    } catch (error) {
      return next(error);
    }
  }
}