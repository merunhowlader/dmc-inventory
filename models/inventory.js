
module.exports = (sequelize, DataTypes) => {


    const Inventory = sequelize.define('inventory',{
       
        locationId: {
             type:DataTypes.INTEGER,
             
         },
         productId:{
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
    
    
    