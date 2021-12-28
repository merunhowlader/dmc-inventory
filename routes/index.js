import express from 'express';
const router = express.Router();
import {registerController,loginController,userController,refreshController, transactionController} from '../controllers';
import auth from '../middlewares/auth';
import productRoute from './productRoute';
import transactionRoute from './transactionRoute';

router.post('/register',registerController.register);

router.post('/login',loginController.login);

router.get('/me',auth,userController.me);
router.post('/refresh',refreshController.refresh);

router.post('/logout',auth,loginController.logout);


router.use('/product/',productRoute);

router.use('/transaction/ict',transactionRoute);

export default router;

