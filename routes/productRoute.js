import express from 'express';
import {productController} from '../controllers';
import auth from '../middlewares/auth';
const productRouter = express.Router();

productRouter.get('/all',productController.getAll);
productRouter.post('/products',auth,productController.store);

productRouter.post('/add',productController.addProduct);

productRouter.post('/addexperation',productController.addProductExperations);
productRouter.get('/productexperation',productController.getProductExperation);


//add track number seraila and batch number
productRouter.post('/addtrackingnumber',productController.addTrackingNumber);




export default productRouter;