const dbConfig = require("../database/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  // pool: {
  //   max: dbConfig.pool.max,
  //   min: dbConfig.pool.min,
  //   acquire: dbConfig.pool.acquire,
  //   idle: dbConfig.pool.idle,
  // },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//This is a comment 
db.User = require("./user.js")(sequelize, Sequelize);
db.RefreshToken = require("./refreshToken.js")(sequelize, Sequelize);
db.Product = require("./product.js")(sequelize, Sequelize);


db.StockOpration = require("./stockOperation.js")(sequelize, Sequelize);
db.Sell = require("./sell.js")(sequelize, Sequelize);
db.Transfer = require("./transfer.js")(sequelize, Sequelize);

//one to many ralation ship
// db.StockOpration.hasMany(db.Sell,{
//   foreignKey:'operationID',
//   constraints: false ,
//   scope:{
//     operationTable:'sell'
//   }
// })

// db.StockOpration.hasMany(db.Transfer,{
//   foreignKey:'operationID',
//   constraints: false ,
//   scope:{
//     operationTable:'transfer'
//   }
// })

// db.StockOpration.belongsTo(db.Sell ,{foreignKey:'operationID',constraints: false});
// db.StockOpration.belongsTo(db.Transfer,{foreignKey:'operationID',constraints: false});





db.Location = require("./location.js")(sequelize, Sequelize);
db.Inventory = require("./inventory.js")(sequelize, Sequelize);
db.Category = require("./category.js")(sequelize, Sequelize);
db.Units = require("./units.js")(sequelize, Sequelize);
db.UnitConversion = require("./unitConversion.js")(sequelize, Sequelize);
db.ProductAttribute = require("./productAttribute.js")(sequelize, Sequelize);





//db.Category.hasMany(db.Product,{onDelete:'CASCADE'});
//db.Product.belongsTo(db.Category,{onDelete:'CASCADE'});


 db.Product.belongsTo(db.ProductAttribute,{foreignKey: 'Attribute_id',  constraints: false});

// db.ProductAttribute.belongsTo(db.Product,{onDelete:'CASCCASCADE'});

//db.ProductAttribute.hasOne(db.Units,{through: unitsID});

//db.Product.belongsToMany(db.Units, { as: 'product_data', through: db.ProductAttribute, foreignKey: 'unit_id'});


 db.ProductAttribute.belongsTo(db.Units, { foreignKey: 'unit_id',  constraints: false });
 db.ProductAttribute.belongsTo(db.Category, { foreignKey: 'category_id',  constraints: false });
 //db.Units.hasMany(db.ProductAttribute,{constraints: false});
//db.Units.belongsToMany(db.ProductAttribute);


db.Location.hasMany(db.Inventory,{onDelete:'CASCADE'});
db.Inventory.belongsTo(db.Location,{onDelete:'CASCADE'});



module.exports = db;






