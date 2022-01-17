
module.exports = (sequelize, DataTypes) => {


    const Units = sequelize.define('unit',{
        unit_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
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
    
    
    