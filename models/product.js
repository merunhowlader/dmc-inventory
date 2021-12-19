

import {DataTypes} from 'Sequelize';

import sequelize from '../database';


const Product = sequelize.define('user',{
    product_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
     },
     name: {
         type: DataTypes.STRING,
         allowNull: false,
        
     },
     type: {
         type:DataTypes.STRING,
         allowNull: false,
        
     },
     department: {
         type:DataTypes.STRING,
         allowNull: false
     },
     rental: {
         type:DataTypes.BOOLEAN,
         allowNull: false
     },
     created_by: {
         type: DataTypes.STRING
     },
     
    
    },{
        timestamps:true,
    });
 
//    (async () => {
//     try{
//         await  User.sync({alter:true });
//         console.log('table  has been updated or created')

//     } catch(err){
//      console.log('db connection error')
//     }
// })
  


   export default Product;


