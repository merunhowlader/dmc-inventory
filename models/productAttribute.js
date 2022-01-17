
module.exports = (sequelize, DataTypes) => {


    const ProductAttribute = sequelize.define('productAttribute',{
     
     
         color: {
             type:DataTypes.STRING,
             allowNull: false,
            
         }
         ,
        //  unitsId:{
        //     type:DataTypes.INTEGER,
        //     // references: {
        //     //     model: 'Units',
                
        //     //   },
        //     //   onDelete: 'cascade',
        //     //   onUpdate: 'cascade',
              
              

        //  },
        //  categoryId:{
        //     type:DataTypes.INTEGER,
        //     // references: {
        //     //     model: 'Category',
               
        //     //   },
        //     //   onDelete: 'cascade',
        //     //   onUpdate: 'cascade',
              
              

        //  },
      
         description:{
            type:DataTypes.STRING,

         }
         
        
        },{
            timestamps:false,
            underscored: true,
            tableName: 'productAttribute',
        });
       
    
    return ProductAttribute;
    };
    
    
    