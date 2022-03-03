
module.exports = (sequelize, DataTypes) => {


    const ProductCountType = sequelize.define('productCountType',{
        
         name: {
             type:DataTypes.STRING,
               
         },
         
        
        },{
            timestamps:false,
        });
    
    return ProductCountType;
    };
    