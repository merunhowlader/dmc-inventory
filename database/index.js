import { Sequelize } from "sequelize";
import {DEBUG_MODE,DB_NAME,DB_USER,DB_PASSWORD} from '../config';

//import {Product,StockLocation} from '../models';
//import Product from './../models/product';
//import StockLocation from './../models/StockLocation';


const {DataTypes} = Sequelize;

const sequelize= new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql',
        logging: false
        // define:{
        //     freezeTableName: true,
        
        // }
    }
);






// const db = {};


 //Product.hasOne(StockLocation,{onDelete:'CASCADE'});
 //StockLocation.belongsTo(products, { onDelete:'CASCADE'});


// module.exports = db;

(async () => {
    try{
        await sequelize.authenticate();
        console.log(' connection has been established')

    } catch(err){
     console.log('db connection error')
    }
})


sequelize.sync({alter: true});

export default sequelize;