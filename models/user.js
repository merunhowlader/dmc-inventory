


import {DataTypes} from 'Sequelize';

import sequelize from '../database';


const User = sequelize.define('user',{
    user_id:{
       type:DataTypes.INTEGER,
       primaryKey:true,
       autoIncrement:true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type:DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type:DataTypes.STRING,
        allowNull: false
    },
    department: {
        type:DataTypes.STRING,
        allowNull: false
    },
    roll: {
        type:DataTypes.INTEGER
    },
    password: {
        type: DataTypes.STRING
    },
    status: {
        type:DataTypes.BOOLEAN,
        defaultValue: true
    },
   
   });


//    (async () => {
//     try{
//         await  User.sync({alter:true });
//         console.log('table  has been updated or created')

//     } catch(err){
//      console.log('db connection error')
//     }
// })
  


   export default User;