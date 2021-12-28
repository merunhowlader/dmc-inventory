
module.exports = (sequelize, DataTypes) => {


    const Transaction = sequelize.define('transaction',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
         },
         from: {
             type: DataTypes.STRING,
             allowNull: false,
            
         },
         to: {
             type:DataTypes.STRING,
             allowNull: false,
            
         },
         date: {
             type:DataTypes.STRING,
             allowNull: true
         },
         status: {
             type:DataTypes.BOOLEAN,
             allowNull: true
         },
         serial: {
             type:DataTypes.STRING,
             allowNull: true
         },
         userId: {
             type:DataTypes.STRING,
             allowNull: false
         }
         
        
        },{
            timestamps:true,
        });
    
    return Transaction;
    };
    
    
    