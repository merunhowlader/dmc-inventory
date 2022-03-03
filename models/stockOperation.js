
module.exports = (sequelize, DataTypes) => {

    const StockOperation = sequelize.define('stockOperation',{
        operation_Id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
         } ,   
         from: {
             type:DataTypes.STRING,
             allowNull: false,
             
            //  references: { // Required field
            //     model: 'location',
            //     key: 'location_id',
            //   },
            //   onDelete: 'cascade',
            //   onUpdate: 'no action',
       
            
             
         },
         to: {
             type:DataTypes.INTEGER,
             allowNull: false,
            //  references: { // Required field
            //     model: 'location',
            //     key: 'location_id',
            //   },
              
            //   onDelete: 'cascade',
            //   onUpdate: 'no action',
           
         },
         reference:{
             type:DataTypes.STRING,
         },
         createdBy:{
            type:DataTypes.STRING,
         }
         ,
         operationType:{
            type:DataTypes.STRING,
         }
        },{
            timestamps:true,
        });
    
    return StockOperation;
    };
    
    
    