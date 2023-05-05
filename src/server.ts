import express from 'express';
import {env} from './env';

const app = express();

app.get('/' , (request,response) =>{
	response.send('Connection in insomnia sucessfull');
} );

app.listen(env.PORT, () => console.log('Server onc at http://localhost:3333'));