
module.exports = (sequelize, DataTypes) => {
    const RefreshToken = sequelize.define('refreshToken',{
        token:{
           type:DataTypes.STRING,
           allowNull: false,
           unique: true,
        }
       },{
        timestamps: false
    });
    
    
    
    return RefreshToken;
    };