
module.exports = (sequelize, DataTypes) => {


    const ProductAttribute = sequelize.define('productAttribute',{
        created_by: {
            type: DataTypes.STRING
        },
        notice: {
            type:DataTypes.INTEGER,
           
        },
        image:{
            type:DataTypes.STRING
        },
        category_id:{
            type:DataTypes.INTEGER
        },
        product_id:{
            type:DataTypes.INTEGER
        }
     
        },{
            timestamps:false,
            underscored: true,
            tableName: 'productAttribute',
        });
       
    
    return ProductAttribute;
    };
    
    
    