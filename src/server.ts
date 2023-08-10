import express  from 'express';
import {env} from './env';
import { router } from './routes';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json());

app.use(router);
app.listen(env.PORT, () => console.log('Server onc at http://localhost:3333'));

