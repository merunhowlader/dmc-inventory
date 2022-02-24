module.exports = (sequelize, DataTypes) => {


    const ProductSerialised = sequelize.define('productSerialised',{

        serial_number: {
            type:DataTypes.STRING,
            unique:true,
        },
        product_id: {
             type:DataTypes.INTEGER,
               
         },
        location_id: {
            type:DataTypes.INTEGER
        }

         
        
        },{
            timestamps:false,
        });
    
    return ProductSerialised;
    };
    