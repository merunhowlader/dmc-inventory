
module.exports = (sequelize, DataTypes) => {


    const ProductBatch = sequelize.define('productBatch',{
        batch_number:{
            type:DataTypes.STRING,
         },
         product_id: {
             type:DataTypes.INTEGER,
               
         },
         location_id:{
            type:DataTypes.INTEGER,
         },
         quantity:{
            type:DataTypes.INTEGER,
            
         },
        
        },{
            timestamps:true,
        });
    
    return ProductBatch;
    };
    