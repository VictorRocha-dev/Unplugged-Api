import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { AuthController } from './controllers/AuthController';
import {AuthMiddleware} from '@/middleware/auth';
import { MeditationController } from './controllers/MeditationController';
import { BinauralController } from './controllers/BinauralController';


const userController = new UserController();
const authController = new AuthController();
const meditationController = new MeditationController();
const binauralController = new BinauralController();



export const router  = Router();

//user and auth
router.get('/users' , AuthMiddleware, userController.index);
router.post('/create' , userController.store);
router.post('/auth' , authController.authenticate);

//meditation
router.get('/meditations' , meditationController.listMeditation);
router.get('/meditationsCategory' , meditationController.listCategory);
router.post('/createMeditationCategory' , meditationController.createCategory);
router.post('/createMeditation' , meditationController.createMeditation);

//binaural
router.get('/binaurals' , binauralController.listBinaural);
router.get('/binauralCategory' , binauralController.listCategory);
router.post('/createBinauralCategory' , binauralController.createCategory);
router.post('/createBinaural' , binauralController.createBinaural);
