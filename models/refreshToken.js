
module.exports = (sequelize, DataTypes) => {
    const RefreshToken = sequelize.define('refreshToken',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
         },
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