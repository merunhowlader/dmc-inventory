
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
     unit_id:{
        type:DataTypes.INTEGER,
        
     },

     quantity: {
        type:DataTypes.INTEGER,
     }
    
    },{
        timestamps:true,
    });

return Product;
};


