import express from 'express';
import {reportController} from '../controllers';
import auth from '../middlewares/auth';
const reportRouter = express.Router();

//productRouter.get('/all',productController.getAll);
reportRouter.get('/inventory',reportController.monthlyInventory);