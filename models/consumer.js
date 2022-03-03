module.exports = (sequelize, DataTypes) => {
    const Consumer = sequelize.define('consumer',{
        id:{
           type:DataTypes.INTEGER,
           primaryKey:true,
           autoIncrement:true,
        },
       
        phone: {
            type:DataTypes.STRING,
            allowNull: false
        },
        status: {
            type:DataTypes.BOOLEAN,
            defaultValue: true
        },
       
       });
    
    
       return Consumer;
    };  
    