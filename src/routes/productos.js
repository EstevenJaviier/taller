import { Router } from 'express';
import * as ProductoController from '../controllers/ProductoController';

const router = Router();

router.get('/search', ProductoController.index);
router.get('/:id', ProductoController.getProducto);
router.get('/categoria/:nombre', ProductoController.getProductosByCategoria);

export default router;
