import express from 'express';
const router = express.Router();
import {registerController,loginController,userController,refreshController} from '../controllers';
import auth from '../middlewares/auth';
import productRoute from './productRoute';
import stockRoute from './stockRoute';

router.post('/register',registerController.register);

router.post('/login',loginController.login);

router.get('/me',auth,userController.me);
router.post('/refresh',refreshController.refresh);

router.post('/logout',auth,loginController.logout);


router.use('/product/',productRoute);

router.use('/stock',stockRoute);

export default router;

