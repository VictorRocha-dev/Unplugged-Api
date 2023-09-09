import express from 'express';
import { env } from './env';
import apiRouter from './routes/index';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json());

app.use('/api', apiRouter); 
app.listen(env.PORT, () => console.log(`Server online at http://localhost:${env.PORT}`));
