import express from 'express';
const router = express.Router();
import {registerController,loginController,userController,refreshController} from '../controllers';
import auth from '../middlewares/auth';
import ictRouter from './ictRoute';

router.post('/register',registerController.register);

router.post('/login',loginController.login);

router.get('/me',auth,userController.me);
router.post('/refresh',refreshController.refresh);

router.post('/logout',auth,loginController.logout);


router.use('/ict/',auth,ictRouter)

export default router;

