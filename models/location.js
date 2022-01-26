
module.exports = (sequelize, DataTypes) => {


    const Location = sequelize.define('location',{
       

         location_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,

         },
         name: {
             type:DataTypes.STRING,
             allowNull: false
         }
        },{
            timestamps:false,
        });
    
    return Location;
    };


    
    