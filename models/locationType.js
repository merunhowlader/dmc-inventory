
module.exports = (sequelize, DataTypes) => {


    const LocationType = sequelize.define('locationType',{
       

         locationType_id:{
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
    
    return LocationType;
    };