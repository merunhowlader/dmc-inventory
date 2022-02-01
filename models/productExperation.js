
module.exports = (sequelize, DataTypes) => {


    const ProductExperation = sequelize.define('productExperation',{
        
         date: {
             type:DataTypes.STRING,
               
         },
         track_id:{
             type:DataTypes.INTEGER,
         },
         table_name:{
             type:DataTypes.STRING,
         }
         
        
        },{
            timestamps:false,
        });
    
    return ProductExperation;
    };
    