import { Router } from 'express';
import { ContentController } from '../controllers/ContentController';
import { upload } from '@/middleware/muter';

const router = Router();
const contentController = new ContentController();

router.get('/', contentController.index);
router.post('/', contentController.createContent);
router.get('/:videoId', contentController.getVideo);
router.put('/:contentId', contentController.updateContent);
router.post('/postvideo' , upload.single('video') , contentController.responsevideomove);
router.put('/:idcontent' , contentController.updateContent);
router.delete('/:contentId' , contentController.deleteContent);
router.post('/:contentId/like', contentController.likeComment);


export default router;
