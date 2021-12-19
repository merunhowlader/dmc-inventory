


import {DataTypes} from 'Sequelize';

import sequelize from '../database';


const StockLocation = sequelize.define('StockLocation',{
    stock_id:{
       type:DataTypes.INTEGER,
       primaryKey:true,
       autoIncrement:true,
    },
    ict: {
        type: DataTypes.INTEGER,
        
       
    },
    medicine: {
        type:DataTypes.INTEGER,
       
       
    },
    general: {
        type:DataTypes.INTEGER,
        
    },
    ward: {
        type:DataTypes.BOOLEAN,
       
    },
    created_by: {
        type: DataTypes.STRING
    },
    
   
   },{
       timestamps:true,
   });


  


export default StockLocation;