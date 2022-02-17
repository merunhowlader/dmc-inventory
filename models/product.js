
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
     description:{
        type:DataTypes.STRING,
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

     notice_amount: {
        type:DataTypes.INTEGER,
     }
    
    },{
        timestamps:true,
    });

return Product;
};


