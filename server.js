import express from "express";
import { APP_PORT } from "./config";
import errorHandler from './middlewares/errorHandler';

import routes from "./routes";



const app = express();

app.use(express.json());



app.use('/api/v1/',routes);

app.use(errorHandler);
app.listen(APP_PORT,()=>console.log(`listening on port ${APP_PORT}`));
