 
import { Router } from 'express';
import { BinauralController } from '../controllers/BinauralController';

const router = Router();
const binauralController = new BinauralController();

// Rotas para as categorias de binaural
router.get('/listCategory' , binauralController.listCategory);
router.post('/createBinauralCategory', binauralController.createCategory);
router.put('/binauralCategories/:categoryId', binauralController.updateCategory);
router.delete('/binauralCategories/:categoryId', binauralController.deleteCategory);
router.get('/listCategory/:id' , binauralController.listCategoryById);


// Rotas para os sons binaurais
router.get('/' , binauralController.listBinaural);
router.post('/', binauralController.createBinaural);
router.put('/:binauralId', binauralController.updateBinaural);
router.delete('/:binauralId', binauralController.deleteBinaural);

router.get('/getFavorite/:userId' , binauralController.getFavorites);
router.get('/:audioId', binauralController.getAudio);
router.post('/favorite', binauralController.favoriteBinaural);
router.delete('/unfavorite/:userId/:binauralId', binauralController.unfavoriteBinaural);

export default router;
