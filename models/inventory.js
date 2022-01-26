
module.exports = (sequelize, DataTypes) => {


    const Inventory = sequelize.define('inventory',{
       
        location_id: {
             type:DataTypes.INTEGER,
             
         },
         product_id:{
            type:DataTypes.INTEGER, 
         },
        quantity: {
             type:DataTypes.DECIMAL(10,2),
             defaultValue:0
         }
    
         
        
        },{
            timestamps:false,
        });
    
    return Inventory;
    };
    
    
    