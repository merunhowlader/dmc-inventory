
module.exports = (sequelize, DataTypes) => {


    const Units = sequelize.define('unit',{
        unit_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
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
    
    
    