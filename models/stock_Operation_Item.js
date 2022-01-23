
module.exports = (sequelize, DataTypes) => {


    const Stock_Operation_Item = sequelize.define('stock_Operation_Item',{
        
       
         ProductId: {
             type:DataTypes.STRING,
             allowNull: false
         },
         Quantity:{
            type:DataTypes.INTEGER,
         }
        },{
            timestamps:true,
            underscored: true,
           
            
        });
    
    return Stock_Operation_Item;
    };