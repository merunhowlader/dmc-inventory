module.exports = (sequelize, DataTypes) => {

const StockLocation = sequelize.define('StockLocation',{
    stock_id:{
       type:DataTypes.INTEGER,
       primaryKey:true,
       autoIncrement:true,
    },
    ict: {
        type: DataTypes.INTEGER,
        
       
    },
    medicine: {
        type:DataTypes.INTEGER,
       
       
    },
    general: {
        type:DataTypes.INTEGER,
        
    },
    ward: {
        type:DataTypes.BOOLEAN,
       
    },
    created_by: {
        type: DataTypes.STRING
    },
    
   
   },{
       timestamps:true,
   });


   
   return StockLocation;
};

  


