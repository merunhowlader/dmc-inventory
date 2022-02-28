
module.exports = (sequelize, DataTypes) => {


    const OperationTrackRecord = sequelize.define('operationTrackRecord',{
        
       
         track_id: {
             type:DataTypes.STRING,
             allowNull: false
         },
         quantity:{
            type:DataTypes.INTEGER,
         },
         item_operation_id:{
             type:DataTypes.INTEGER
         }
        },{
            timestamps:false,
           
           
            
        });
    
    return OperationTrackRecord;
    };