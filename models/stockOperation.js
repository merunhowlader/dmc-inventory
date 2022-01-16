
module.exports = (sequelize, DataTypes) => {

    const StockOpration = sequelize.define('stockOperation',{
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
    
    return StockOpration;
    };
    
    
    