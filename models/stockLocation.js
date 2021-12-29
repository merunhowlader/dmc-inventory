module.exports = (sequelize, DataTypes) => {

const StockLocation = sequelize.define('StockLocation',{
    id:{
       type:DataTypes.INTEGER,
       primaryKey:true,
       autoIncrement:true,
    },
    ict: {
        type: DataTypes.DECIMAL(10,2),
        
       
    },
    medicine: {
        type:DataTypes.DECIMAL(10,2),
       
       
    },
    general: {
        type:DataTypes.DECIMAL(10,2),
        
    },
    ward: {
        type:DataTypes.DECIMAL(10,2),
       
    },
    created_by: {
        type: DataTypes.INTEGER
    },
    
   
   },{
       timestamps:true,
   });


   
   return StockLocation;
};

  


