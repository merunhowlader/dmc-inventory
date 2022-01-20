
import {DEBUG_MODE,DB_NAME,DB_USER,DB_PASSWORD} from '../config';

module.exports = {
    HOST: "localhost",
    USER: DB_USER,
    PASSWORD:DB_PASSWORD,
    DB: DB_NAME,
    dialect: "mysql",
    // pool: {
    //   max: 5,
    //   min: 0,
    //   acquire: 30000,
    //   idle: 10000
    // }
  };

