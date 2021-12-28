

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

db.RefreshToken = require("./refreshToken.js")(sequelize, Sequelize);
db.User = require("./user.js")(sequelize, Sequelize);
db.Product = require("./product.js")(sequelize, Sequelize);
db.StockLocation = require("./stockLocation.js")(sequelize, Sequelize);

db.Transaction = require("./transaction.js")(sequelize,Sequelize);
db.TransactionItem = require("./transactionItem.js")(sequelize, Sequelize);

db.Transaction.hasMany(db.TransactionItem,{onDelete:'CASCADE'});
db.TransactionItem.belongsTo(db.Transaction,{onDelete:'CASCADE'});

db.Product.hasOne(db.StockLocation,{onDelete:'CASCADE'});
db.StockLocation.belongsTo(db.Product,{onDelete:'CASCADE'});

module.exports = db;






