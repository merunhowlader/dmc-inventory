
module.exports = (sequelize, DataTypes) => {


    const ProductAttribute = sequelize.define('productAttribute',{
     
     
         color: {
             type:DataTypes.STRING,
             allowNull: false,
         },
         sku: {
            type:DataTypes.STRING,
         }
         ,
        created_by: {
            type: DataTypes.STRING
        },
        notice: {
            type:DataTypes.INTEGER,
           
        },
     
        },{
            timestamps:false,
            underscored: true,
            tableName: 'productAttribute',
        });
       
    
    return ProductAttribute;
    };
    
    
    