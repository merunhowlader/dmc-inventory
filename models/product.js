
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
     BaseUnitId: {
         type:DataTypes.STRING,
         allowNull: false
     },
     serialized: {
         type:DataTypes.BOOLEAN,
         allowNull: false
     },
     notice: {
        type:DataTypes.INTEGER,
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


