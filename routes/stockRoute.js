import express from 'express';
import { stockOperationController } from '../controllers';
import auth from '../middlewares/auth';

const stockRoute = express.Router();


stockRoute.get('/operation',stockOperationController.stockOperation);

stockRoute.post('/transfer',stockOperationController.transfer);
stockRoute.post('/loan',stockOperationController.loan);

stockRoute.get('/allinventory',stockOperationController.inventory);
stockRoute.post('/supply',stockOperationController.supply);



export default stockRoute;