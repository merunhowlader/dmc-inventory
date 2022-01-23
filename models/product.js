
module.exports = (sequelize, DataTypes) => {


const Product = sequelize.define('product',{
    ProductId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
     },
     Name: {
         type:DataTypes.STRING,
         allowNull: false,    
     },
     description:{
        type:DataTypes.STRING,
     },

     quantity: {
        type:DataTypes.STRING,
     },
    
    },{
        timestamps:true,
    });

return Product;
};


