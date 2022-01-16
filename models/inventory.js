
module.exports = (sequelize, DataTypes) => {


    const Inventory = sequelize.define('inventory',{
        PriductId:{
            type:DataTypes.INTEGER, 
         },
         locationId: {
             type:DataTypes.INTEGER,
             
         },
         Quantity: {
             type:DataTypes.INTEGER,
         }
    
         
        
        },{
            timestamps:false,
        });
    
    return Inventory;
    };
    
    
    