
module.exports = (sequelize, DataTypes) => {


    const StockOperationItem = sequelize.define('stockOperationItem',{
        
       
         product_id: {
             type:DataTypes.STRING,
             allowNull: false
         },
         quantity:{
            type:DataTypes.INTEGER,
         },
         stockOperationId:{
             type:DataTypes.INTEGER
         }
        },{
            timestamps:false,
           
           
            
        });
    
    return StockOperationItem;
    };