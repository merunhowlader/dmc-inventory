import express from 'express';
import { stockOperationController } from '../controllers';
import auth from '../middlewares/auth';

const stockRoute = express.Router();


stockRoute.get('/operation',stockOperationController.stockOperation);

stockRoute.post('/transfer',stockOperationController.transfer);

export default stockRoute;