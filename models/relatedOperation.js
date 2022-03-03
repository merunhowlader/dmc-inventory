
module.exports = (sequelize, DataTypes) => {


    const RelatedOperation = sequelize.define('relatedOperation',{
       
         act_id:{
             type:DataTypes.INTEGER,
         },
         
         demand_operation:{
            type:DataTypes.STRING,
         },
         react_id:{
            type:DataTypes.INTEGER,
        }
    
         
        
        },{
            timestamps:true,
           
          
        });
    
    return RelatedOperation;
    };
    