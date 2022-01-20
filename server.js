import express from "express";
import { APP_PORT } from "./config";
import errorHandler from './middlewares/errorHandler';

import routes from "./routes";
const db = require("./models");



const app = express();

app.use(express.json());




try {
  db.sequelize.sync({ alter: true,force: false }).then(() => {
    console.log("Drop and re-sync db.");
  }).catch(err =>{
    console.log(err);
  });

}catch(err) {
  console.log("some this wrong happen in sequelize");

}




app.use('/api/v1/',routes);
app.use(errorHandler);
app.listen(APP_PORT,()=>console.log(`listening on port ${APP_PORT}`));



