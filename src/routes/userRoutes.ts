import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { UserController } from '../controllers/UserController';
import { AuthController } from '@/controllers/AuthController';

const router = Router();
const userController = new UserController();
const authController = new AuthController();

router.get('/',  userController.index);
router.get('/userAuthenticated'  ,authMiddleware , authController.userAuthentication);
router.post('/create', userController.store);


router.put('/update', userController.update);


router.post('/auth' , authController.authenticate);

export default router;
