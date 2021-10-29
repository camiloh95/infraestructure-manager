import express from 'express';

import aws from './server/aws/route';
import bitbucketRepository from './repository/bitbucket/route';
const app = express();

app.use('/server/aws', aws);
app.use('/repository/bitbucket', bitbucketRepository);

export default app;