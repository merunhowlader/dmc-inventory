
module.exports = (sequelize, DataTypes) => {


const Product = sequelize.define('product',{
    product_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
       },
     name: {
         type:DataTypes.STRING,
         allowNull: false,    
       },
     sku: {
        type:DataTypes.STRING,
        allowNull: false,  
       }
      ,
     unit_id:{
        type:DataTypes.INTEGER,
        
      },
     count_type:{
      type:DataTypes.INTEGER,
      allowNull: false,
       },
       price:{
        type: DataTypes.DECIMAL(10,2),
       },
     category_id:{
      type:DataTypes.INTEGER
       },
     returnable_product:{
      type:DataTypes.BOOLEAN,
      defaultValue: false

     }
    },{
        timestamps:true,
    });

return Product;
};


