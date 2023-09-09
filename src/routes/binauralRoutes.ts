 
import { Router } from 'express';
import { BinauralController } from '../controllers/BinauralController';

const router = Router();
const binauralController = new BinauralController();

// Rotas para as categorias de binaural
router.post('/createBinauralCategory', binauralController.createCategory);
router.put('/binauralCategories/:categoryId', binauralController.updateCategory);
router.delete('/binauralCategories/:categoryId', binauralController.deleteCategory);

// Rotas para os sons binaurais
router.post('/createBinaural', binauralController.createBinaural);
router.put('/binaurals/:binauralId', binauralController.updateBinaural);
router.delete('/binaurals/:binauralId', binauralController.deleteBinaural);


router.get('/binaurals/:audioId', binauralController.getAudio);
router.post('/binaural/favorite', binauralController.favoriteBinaural);
router.delete('/binaural/unfavorite', binauralController.unfavoriteBinaural);

export default router;
