
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
        ,
        demandStatus:{
            type:DataTypes.BOOLEAN,
            
        }
    
         
        
        },{
            timestamps:true,
           
          
        });
    
    return RelatedOperation;
    };
    