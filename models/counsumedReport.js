module.exports = (sequelize, DataTypes) => {
    const ConsumerReport = sequelize.define('consumedReport',{
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
    
    
       return ConsumerReport;
    };  
    