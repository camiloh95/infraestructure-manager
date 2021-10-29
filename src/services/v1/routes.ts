import express from 'express';

import bitbucketRepository from './repository/bitbucket/route';

const app = express();

app.use('/repository/bitbucket', bitbucketRepository);

export default app;