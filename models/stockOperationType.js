
module.exports = (sequelize, DataTypes) => {


    const Transfer = sequelize.define('transfer',{
        
       
         name: {
             type:DataTypes.STRING,
             allowNull: false
         }
        },{
            timestamps:false,
            underscored: false,
           
            
        });
    
    return Transfer;


    };