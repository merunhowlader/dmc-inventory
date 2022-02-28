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
db.LocationType=require("./locationType")(sequelize,Sequelize);
db.LoanInventory=require("./loanInventory")(sequelize,Sequelize);
db.LocationType=require("./locationType")(sequelize,Sequelize);
//serial batch exparation
db.ProductBatch=require("./productBatch")(sequelize,Sequelize);
db.ProductCountType=require("./productCountType")(sequelize,Sequelize);
db.ProductExperation=require("./productExperation")(sequelize,Sequelize);
db.ProductSerialised=require("./productSerialised")(sequelize,Sequelize);
db.OperationTrackRecord=require("./operationTrackRecord")(sequelize,Sequelize);

//related operation 
db.RelatedOperation=require("./relatedOperation")(sequelize,Sequelize);
//product expration relation

db.ProductBatch.hasMany(db.ProductExperation,{foreignKey:'track_id', targetKey:'track_id',constraints: false,scope:{table_name:'productBatch'}});
db.ProductExperation.belongsTo(db.ProductBatch,{foreignKey:'track_id', targetKey:'batch_number',constraints: false});

db.ProductSerialised.hasMany(db.ProductExperation,{foreignKey:'track_id', targetKey:'track_id',constraints: false,scope:{table_name:'productSerialised'}});
db.ProductExperation.belongsTo(db.ProductSerialised,{foreignKey:'track_id', targetKey:'serial_number',constraints: false});

db.Product.hasOne(db.ProductBatch,{foreignKey: 'product_id',  constraints: false});
db.ProductBatch.belongsTo(db.Product,{foreignKey: 'product_id',  constraints: false});

db.Product.hasOne(db.ProductSerialised,{foreignKey: 'product_id',  constraints: false})
db.ProductSerialised.belongsTo(db.Product,{foreignKey: 'product_id',  constraints: false});
db.LocationType.hasMany(db.Location,{foreignKey: 'type',  constraints: false});
db.Location.belongsTo(db.LocationType,{foreignKey: 'type',  constraints: false});


db.Location.hasMany(db.Location, {foreignKey: 'parentLocation',as:'substore',  constraints: false}) ;


db.StockOperationItem.belongsTo(db.Product,{foreignKey: 'product_id',  constraints: false});



db.StockOpration.hasMany(db.StockOperationItem,{foreignKey:'stockOperationId',constraints: false});
db.StockOperationItem.belongsTo(db.StockOpration,{foreignKey:'stockOperationId',constraints: false});


db.StockOperationItem.hasMany(db.OperationTrackRecord,{foreignKey:'item_operation_id',constraints: false});
db.OperationTrackRecord.belongsTo(db.StockOperationItem,{foreignKey:'item_operation_id',constraints: false});

 //db.Location.hasMany(db.StockOpration,{foreignKey:'from',as:'from_location',constraints: false});
 // db.Location.hasMany(db.StockOpration,{foreignKey:'to',as:'to_location',constraints: false});
// db.StockOpration.belongsTo(db.Location,{foreignKey:{name:'from',allowNull:false}});
 

//  db.StockOpration.belongsTo(db.Location,{foreignKey:'location_id',as:'auron',constraints: false});
//  db.StockOpration.belongsTo(db.Location,{foreignKey:'location_id',as:'merun',constraints: false});


 db.StockOpration.belongsTo(db.Location, {foreignKey:'from',as: 'From',constraints: false});
 db.StockOpration.belongsTo(db.Location, {foreignKey:'to',as: 'To',constraints: false});

db.Product.hasOne(db.ProductAttribute,{foreignKey: 'product_id',  constraints: false})
db.ProductAttribute.belongsTo(db.Product,{foreignKey: 'product_id',  constraints: false});


 db.Units.hasMany(db.Product, { foreignKey: 'unit_id',constraints: false});
 db.Product.belongsTo(db.Units, { foreignKey: 'unit_id',  constraints: false });

db.Category.hasMany(db.Product, { foreignKey: 'category_id',  constraints: false });
db.Product.belongsTo(db.Category, { foreignKey: 'category_id',  constraints: false });

db.Product.hasMany(db.Inventory, { foreignKey: 'product_id',  constraints: false });
db.Inventory.belongsTo(db.Product, { foreignKey: 'product_id',  constraints: false });

db.Location.hasMany(db.Inventory, { foreignKey: 'location_id',  constraints: false });
db.Inventory.belongsTo(db.Location, { foreignKey: 'location_id',  constraints: false });

//loanInventory
db.Product.hasMany(db.Inventory, { foreignKey: 'product_id',  constraints: false });
db.Inventory.belongsTo(db.Product, { foreignKey: 'product_id',  constraints: false });

db.Location.hasMany(db.Inventory, { foreignKey: 'location_id',  constraints: false });
db.Inventory.belongsTo(db.Location, { foreignKey: 'location_id',  constraints: false });

//

db.Product.hasMany(db.LoanInventory, { foreignKey: 'product_id',  constraints: false });
db.LoanInventory.belongsTo(db.Product, { foreignKey: 'product_id',  constraints: false });

db.Location.hasMany(db.LoanInventory, { foreignKey: 'location_id_from',as:'from',  constraints: false });
db.Location.hasMany(db.LoanInventory, { foreignKey: 'location_id_to',as:'to',  constraints: false });

db.LoanInventory.belongsTo(db.Location, { foreignKey: 'location_id_from',  constraints: false });
db.LoanInventory.belongsTo(db.Location, { foreignKey: 'location_id_to',  constraints: false });



module.exports = db;






