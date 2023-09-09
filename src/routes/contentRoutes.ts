import { Router } from 'express';
import { ContentController } from '../controllers/ContentController';

const router = Router();
const contentController = new ContentController();

router.get('/', contentController.index);
router.post('/', contentController.createContent);
router.get('/:videoId', contentController.getVideo);
router.put('/:contentId', contentController.updateContent);


export default router;
