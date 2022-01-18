import express from 'express';
import { transactionController } from '../controllers';
import auth from '../middlewares/auth';

const transactionRouter = express.Router();


transactionRouter.post('/out',auth,transactionController.makeOutTransaction);

transactionRouter.post('/transfer',auth,transactionController.transfer);

export default transactionRouter;