import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { AuthController } from './controllers/AuthController';
import {AuthMiddleware} from '@/middleware/auth';


const userController = new UserController();
const authController = new AuthController();


export const router  = Router();

router.post('/create' , userController.store);
router.get('/users' , AuthMiddleware, userController.index);
router.post('/auth' , authController.authenticate);