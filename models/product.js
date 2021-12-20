
module.exports = (sequelize, DataTypes) => {


const Product = sequelize.define('product',{
    product_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
     },
     name: {
         type: DataTypes.STRING,
         allowNull: false,
        
     },
     type: {
         type:DataTypes.STRING,
         allowNull: false,
        
     },
     department: {
         type:DataTypes.STRING,
         allowNull: false
     },
     rental: {
         type:DataTypes.BOOLEAN,
         allowNull: false
     },
     created_by: {
         type: DataTypes.STRING
     },
     
    
    },{
        timestamps:true,
    });

return Product;
};


