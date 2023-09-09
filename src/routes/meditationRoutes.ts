 
import { Router } from 'express';
import { MeditationController } from '../controllers/MeditationController';

const router = Router();
const meditationController = new MeditationController();

router.get('/meditations', meditationController.listMeditation);
router.get('/meditationsCategory', meditationController.listCategory);
router.post('/createMeditationCategory', meditationController.createCategory);
router.post('/createMeditation', meditationController.createMeditation);
router.get('/meditations/:audioId', meditationController.getAudio);

export default router;
