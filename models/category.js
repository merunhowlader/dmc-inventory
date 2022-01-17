
module.exports = (sequelize, DataTypes) => {


    const Category = sequelize.define('category',{
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
          },
        
         name: {
             type:DataTypes.STRING,
             allowNull: false
         },
    
         
        
        },{
            timestamps:false,
            underscored: true,
            tableName: 'category'
        });
    
    return Category;
    };
    
    
    