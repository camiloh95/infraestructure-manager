import { RepositoryService } from '.';
import { RequestHandler } from 'express';

export class RepositoryController {
  getAllRepositories: RequestHandler = async (req, res, next) => {
    try {
      const aRepositoryService = new RepositoryService();
      const tableName = req.query.table_name as any;
      const { status, data } = await aRepositoryService.getAllRepositories(tableName);
      res.status(status).json({ data });
    } catch (err) {
      return next(err);
    }
  }

  createRepository: RequestHandler = async (req, res, next) => {
    try {
      const aRepositoryService = new RepositoryService();
      const params = req.body;
      const { status, data } = await aRepositoryService.createRepository(params);
      return res.status(status).json({ data });
    } catch (error) {
      return next(error);
    }
  }
}