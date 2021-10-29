import express from 'express';
import { ServerController } from './controller'

const app = express();
const aServerController = new ServerController();

app.post('/create-ecs-instance', aServerController.createECSInstance);

export default app;