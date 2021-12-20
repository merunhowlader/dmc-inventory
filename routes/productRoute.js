import express from 'express';
import {productController} from '../controllers';
import auth from '../middlewares/auth';
const productRouter = express.Router();


productRouter.post('/products',auth,productController.store);

export default productRouter;