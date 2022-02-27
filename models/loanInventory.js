
module.exports = (sequelize, DataTypes) => {


    const LoanInventory = sequelize.define('loanInventory',{
       
        location_id_from: {
             type:DataTypes.INTEGER,
             
          },
         location_id_to: {
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
    
    return LoanInventory;
    };
    
    
    