
module.exports = (sequelize, DataTypes) => {


    const ProductExperation = sequelize.define('productExperation',{
        
         date: {
            type:DataTypes.DATE,
               
         },
         track_id:{
             type:DataTypes.STRING,
         },
         table_name:{
             type:DataTypes.STRING,
         }
         
        
        },{
            timestamps:false,
        });
    
    return ProductExperation;
    };
    