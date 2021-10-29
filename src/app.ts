import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/', require('./routes'));

export default app;