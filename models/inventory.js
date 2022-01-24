
module.exports = (sequelize, DataTypes) => {


    const Inventory = sequelize.define('inventory',{
        productId:{
            type:DataTypes.INTEGER, 
         },
        locationId: {
             type:DataTypes.INTEGER,
             
         },
        quantity: {
             type:DataTypes.INTEGER,
         }
    
         
        
        },{
            timestamps:false,
        });
    
    return Inventory;
    };
    
    
    