import cors from 'cors';
import helmet from 'helmet';
import express, { urlencoded, json } from 'express';

import routesV1 from './services/v1/routes'

const app = express();

app.use(cors());
app.use(json());
app.use(helmet());
app.use(urlencoded({ extended: true }));

app.use('/api/v1/', routesV1);

app.use((err:any,req:any,res:any,next:any) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message
    }
  });
});

export default app;