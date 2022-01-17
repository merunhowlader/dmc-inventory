
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
        
     },
     serialized: {
         type:DataTypes.BOOLEAN,
         
     },
     notice: {
        type:DataTypes.INTEGER,
       
    },
     created_by: {
         type: DataTypes.STRING
     },
     
    
    },{
        timestamps:true,
    });

return Product;
};


