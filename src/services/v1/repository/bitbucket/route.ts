import express from 'express';
import { RepositoryController } from './controller';

const app = express();

const aRepositoryController = new RepositoryController();

app.post('/create-repository', aRepositoryController.createRepository);

export default app;