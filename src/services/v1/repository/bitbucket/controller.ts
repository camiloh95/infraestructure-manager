import { RepositoryService } from '.';
import { RequestHandler } from 'express';

export class RepositoryController {
  createRepository: RequestHandler = async (req, res, next) => {
    try {
      const aRepositoryService = new RepositoryService();
      const params = req.body;
      const response = await aRepositoryService.createRepository(params);
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }
}