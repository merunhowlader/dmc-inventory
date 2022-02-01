import express from 'express';
import {productController} from '../controllers';
import auth from '../middlewares/auth';
const productRouter = express.Router();

productRouter.get('/all',productController.getAll);
productRouter.post('/products',auth,productController.store);

productRouter.post('/add',productController.addProduct);

productRouter.post('/addexperation',productController.addProductExperations);




export default productRouter;