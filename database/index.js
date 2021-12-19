import { Sequelize } from "sequelize";
import {DEBUG_MODE,DB_NAME,DB_USER,DB_PASSWORD} from '../config';
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

sequelize.sync({alter: true});

(async () => {
    try{
        await sequelize.authenticate();
        console.log(' connection has been established')

    } catch(err){
     console.log('db connection error')
    }
})

export default sequelize;