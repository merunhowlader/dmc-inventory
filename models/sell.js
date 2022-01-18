
module.exports = (sequelize, DataTypes) => {


    const Sell = sequelize.define('sell',{
        
       
         name: {
             type:DataTypes.STRING,
             allowNull: false
         }
        },{
            timestamps:true,
            underscored: true,
           
            
        });
    
    return Sell;
    };
    
    
    