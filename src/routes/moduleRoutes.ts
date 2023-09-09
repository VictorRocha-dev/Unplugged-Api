 
import { Router } from 'express';
import { ModuleController } from '../controllers/ModulesController';

const router = Router();
const moduleController = new ModuleController();

router.get('/', moduleController.index);
router.post('/', moduleController.createModule);
router.put('/:moduleId' ,  moduleController.updateModule);

export default router;
