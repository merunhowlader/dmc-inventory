
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
            
         }
         
        
        },{
            timestamps:true,
        });
    
    return TransactionItem;
    };
    