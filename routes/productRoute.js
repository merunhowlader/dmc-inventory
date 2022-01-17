import express from 'express';
import {productController} from '../controllers';
import auth from '../middlewares/auth';
const productRouter = express.Router();

productRouter.get('/all',productController.getAll);
productRouter.post('/products',auth,productController.store);

export default productRouter;