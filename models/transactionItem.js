
module.exports = (sequelize, DataTypes) => {


    const TransactionItem = sequelize.define('transactionItem',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
         },
         product_id: {
             type: DataTypes.STRING,
             allowNull: false,
            
         },
         
         product_name: {
             type: DataTypes.STRING,
             
            
         },
         product_quantity: {
             type: DataTypes.STRING,
            
            
         },
         product_demand: {
             type: DataTypes.DECIMAL ,
             
            
         }
          
        },{
            timestamps:true,
        });
    
    return TransactionItem;
    };
    