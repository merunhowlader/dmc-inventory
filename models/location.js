
module.exports = (sequelize, DataTypes) => {


    const Location = sequelize.define('location',{
       
         name: {
             type:DataTypes.STRING,
             allowNull: false
         }
        },{
            timestamps:false,
        });
    
    return Location;
    };


    
    