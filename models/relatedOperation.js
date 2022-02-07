
module.exports = (sequelize, DataTypes) => {


    const RelatedOperation = sequelize.define('relatedOperation',{
       
         act_id:{
             type:DataTypes.STRING,
         },
         act_by:{
            type:DataTypes.STRING,
         },
         
         demand_operation:{
            type:DataTypes.STRING,
         },
         react_id:{
            type:DataTypes.STRING,
        },
        react_by:{
           type:DataTypes.STRING,
        },
    
         
        
        },{
            timestamps:true,
           
          
        });
    
    return RelatedOperation;
    };
    