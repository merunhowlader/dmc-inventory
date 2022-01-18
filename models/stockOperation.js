
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
         },
         opetrationId: {
             type:DataTypes.INTEGER,
         },
         opreationTableName: {
             type:DataTypes.STRING,
         }
        },{
            timestamps:false,
        });
    
    return StockOpration;
    };
    
    
    