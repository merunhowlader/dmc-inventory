
module.exports = (sequelize, DataTypes) => {


    const ProductAttribute = sequelize.define('productAttribute',{
     
         color: {
             type:DataTypes.STRING,
             allowNull: false,
            
         },
         unitWeight: {
             type:DataTypes.STRING,
             allowNull: false
         },
         image:{
            type:DataTypes.STRING,

         },
         description:{
            type:DataTypes.STRING,

         }
         
        
        },{
            timestamps:true,
        });
    
    return ProductAttribute;
    };
    
    
    