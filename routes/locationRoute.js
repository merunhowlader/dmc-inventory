import express from 'express';
import { locationController } from '../controllers';
import auth from '../middlewares/auth';

const locationRoute = express.Router();


locationRoute.get('/',locationController.getAll);

locationRoute.post('/',locationController.addNewLocation);

//locationRoute.post('/add',stocklocationController.transfer);




export default locationRoute;