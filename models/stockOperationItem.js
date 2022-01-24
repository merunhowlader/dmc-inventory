
module.exports = (sequelize, DataTypes) => {


    const StockOperationItem = sequelize.define('stockOperationItem',{
        
       
         productId: {
             type:DataTypes.STRING,
             allowNull: false
         },
         quantity:{
            type:DataTypes.INTEGER,
         }
        },{
            timestamps:false,
           
           
            
        });
    
    return StockOperationItem;
    };