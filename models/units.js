
module.exports = (sequelize, DataTypes) => {


    const Units = sequelize.define('unit',{
        unit_id: {
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
            underscored: true,    
        });
    
    return Units;
    };
    
    
    