
module.exports = (sequelize, DataTypes) => {


    const Units = sequelize.define('unit',{
        UnitId:{
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
    
    return Units;
    };
    
    
    