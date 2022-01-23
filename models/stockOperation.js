
module.exports = (sequelize, DataTypes) => {

    const StockOpration = sequelize.define('stockOperation',{
        operation_Id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
         } ,   
         from: {
             type:DataTypes.STRING,
             allowNull: false
         },
         to: {
             type:DataTypes.INTEGER,
         },
         serial: {
             type:DataTypes.STRING,
         },
         createdBy:{
            type:DataTypes.STRING,
         }
         ,
         operationType:{
            type:DataTypes.STRING,
         }
        },{
            timestamps:false,
        });
    
    return StockOpration;
    };
    
    
    