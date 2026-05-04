const config = require('../config/config');
const mongoose = require('mongoose');
const db = {};

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

db.mongoose = mongoose;
db.url = config.DB_URL;

// chargement des modeles avec le pattern factory
db.categories = require('../api/models/categorie.model')(mongoose);
db.produits = require('../api/models/produit.model')(mongoose);

module.exports = db;
