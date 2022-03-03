
module.exports = (sequelize, DataTypes) => {


    const Location = sequelize.define('location',{
       

         location_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,

         },
         name: {
             type:DataTypes.STRING,
             allowNull: false,
             unique: true
         },
         type:{
             type:DataTypes.INTEGER,
             //allowNull: false
         },
         parentLocation:{
            type:DataTypes.INTEGER,
            defaultValue:null, 
        },
         
        },{
            timestamps:false,
        });
    
    return Location;
    };


    
    