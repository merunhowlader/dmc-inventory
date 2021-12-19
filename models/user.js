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
        allowNull: false,
        validate:{
            len:[4,40]
        }
    },
    email: {
        type:DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true
        }
    },
    phone: {
        type:DataTypes.STRING,
        allowNull: false
    },
    department: {
        type:DataTypes.STRING,
        allowNull: false
    },
    role: {
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