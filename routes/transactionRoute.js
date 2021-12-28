import express from 'express';
import { transactionController } from '../controllers';
import auth from '../middlewares/auth';

const transactionRouter = express.Router();


transactionRouter.post('/out',auth,transactionController.makeOutTransaction);

export default transactionRouter;