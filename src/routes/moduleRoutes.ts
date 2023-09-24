 
import { Router } from 'express';
import { ModuleController } from '../controllers/ModulesController';

const router = Router();
const moduleController = new ModuleController();

router.get('/', moduleController.index);
router.post('/', moduleController.createModule);
router.put('/:moduleId' ,  moduleController.updateModule);
router.get('/:moduleId' , moduleController.listUniqueModule);
router.delete('/:moduleId', moduleController.deleteModule);

export default router;
