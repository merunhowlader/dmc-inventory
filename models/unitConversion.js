
module.exports = (sequelize, DataTypes) => {


    const UnitConversion = sequelize.define('Conversion',{
        ProductId:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
         },
         BaseUnitId: {
             type:DataTypes.INTEGER,
             allowNull: false
         },
         Multiplier: {
            type:DataTypes.INTEGER,
            allowNull: false
        },
        ToUnitId: {
            type:DataTypes.STRING,
            allowNull: false
        },
        PurchasePrice:{
            type:DataTypes.STRING,  
        }
        },
        {
            timestamps:false,
        });
    
    return UnitConversion;
    };
    
    
    