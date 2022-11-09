import { Router } from 'express';

import ProductoRouter from './productos';

const router = Router();

router.use('/productos', ProductoRouter);

export default router;
