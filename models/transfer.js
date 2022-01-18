
module.exports = (sequelize, DataTypes) => {


    const Transfer = sequelize.define('transfer',{
        
       
         name: {
             type:DataTypes.STRING,
             allowNull: false
         }
        },{
            timestamps:true,
            underscored: true,
           
            
        });
    
    return Transfer;
    };
    
    
    