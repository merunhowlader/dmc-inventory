


import {DataTypes} from 'Sequelize';

import sequelize from '../database';


const RefreshToken = sequelize.define('refreshToken',{
    token:{
       type:DataTypes.STRING,
       allowNull: false,
       unique: true,
    }
   },{
    timestamps: false
});





export default RefreshToken;