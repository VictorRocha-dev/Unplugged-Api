import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { AuthController } from './controllers/AuthController';
import {AuthMiddleware} from '@/middleware/auth';
import { MeditationController } from './controllers/MeditationController';


const userController = new UserController();
const authController = new AuthController();
const meditationController = new MeditationController();


export const router  = Router();

//user and auth
router.post('/create' , userController.store);
router.get('/users' , AuthMiddleware, userController.index);
router.post('/auth' , authController.authenticate);

//meditation
router.get('/meditations' , meditationController.listMeditation);
router.get('/meditationsCategory' , meditationController.listCategory);
router.post('/createMeditationCategory' , meditationController.createCategory);
router.post('/createMeditation' , meditationController.createMeditation);

