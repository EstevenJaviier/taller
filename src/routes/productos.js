import { Router } from 'express';
import * as ProductoController from '../controllers/ProductoController';

const router = Router();

router.get('/', ProductoController.index);
router.post('/', ProductoController.store);
router.get('/:id', ProductoController.show);
router.put('/:id', ProductoController.update);
router.delete('/:id', ProductoController.destroy);

export default router;
