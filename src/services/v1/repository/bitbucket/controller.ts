import { RepositoryService } from '.';
import { RequestHandler } from 'express';

export class RepositoryController {
  getAllRepositories: RequestHandler = async (req, res, next) => {
    try {
      const aRepositoryService = new RepositoryService();
      const tableName = req.query.table_name as any;
      const repositories = await aRepositoryService.getAllRepositories(tableName);
      res.status(200).json(repositories);
    } catch (err) {
      return next(err);
    }
  }

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