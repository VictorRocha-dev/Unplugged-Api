
import { Router } from 'express';
import { MeditationController } from '../controllers/MeditationController';

const router = Router();
const meditationController = new MeditationController();

router.get('/', meditationController.listMeditation);
router.get('/meditationadmin', meditationController.listMeditationadmin);

router.post('/', meditationController.createMeditation);
router.get('/meditationsCategory', meditationController.listCategory);
router.get('/meditationsCategoryadm', meditationController.listCategoryadmin);

router.post('/createMeditationCategory', meditationController.createCategory);
router.get('/:audioId', meditationController.getAudio);

export default router;
