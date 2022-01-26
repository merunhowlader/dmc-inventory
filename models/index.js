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

db.User = require("./user.js")(sequelize, Sequelize);
db.RefreshToken = require("./refreshToken.js")(sequelize, Sequelize);
db.Product = require("./product.js")(sequelize, Sequelize);
db.StockOpration = require("./stockOperation.js")(sequelize, Sequelize);
db.Location = require("./location.js")(sequelize, Sequelize);
db.Inventory = require("./inventory.js")(sequelize, Sequelize);
db.Category = require("./category.js")(sequelize, Sequelize);
db.Units = require("./units.js")(sequelize, Sequelize);
db.UnitConversion = require("./unitConversion.js")(sequelize, Sequelize);
db.ProductAttribute = require("./productAttribute.js")(sequelize, Sequelize);
db.StockOperationItem=require("./stockOperationItem")(sequelize, Sequelize);




db.StockOperationItem.belongsTo(db.Product,{foreignKey: 'product_id',  constraints: false});



db.StockOpration.hasMany(db.StockOperationItem,{foreignKey:{name:'stockOperationId',allowNull:false}});
db.StockOperationItem.belongsTo(db.StockOpration,{foreignKey:{name:'stockOperationId',allowNull:false}});


db.Product.hasOne(db.ProductAttribute,{foreignKey: 'product_id',  constraints: false})
db.ProductAttribute.belongsTo(db.Product,{foreignKey: 'product_id',  constraints: false});


 db.Product.hasMany(db.Units, { foreignKey: 'unit_id',constraints: false});
 db.Product.belongsTo(db.Units, { foreignKey: 'unit_id',  constraints: false });

db.Category.hasMany(db.ProductAttribute, { foreignKey: 'category_id',  constraints: false });
db.ProductAttribute.belongsTo(db.Category, { foreignKey: 'category_id',  constraints: false });

db.Product.hasMany(db.Inventory, { foreignKey: 'product_id',  constraints: false });
db.Inventory.belongsTo(db.Product, { foreignKey: 'product_id',  constraints: false });

db.Location.hasMany(db.Inventory, { foreignKey: 'location_id',  constraints: false });
db.Inventory.belongsTo(db.Location, { foreignKey: 'location_id',  constraints: false });


module.exports = db;






