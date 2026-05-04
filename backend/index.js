const express = require('express');
const database = require('./src/database/db.config');
require('dotenv').config();

const app = express();

// CORS pour autoriser les requetes depuis Angular
const cors = require('cors');
app.use(cors());

// Middleware pour lire le JSON et les formulaires
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connexion MongoDB
database.mongoose.connect(database.url)
  .then(() => {
    console.log('connected to database');
  })
  .catch(err => {
    console.log('Database connection error:', err);
    process.exit();
  });

// Route par defaut
app.get('/', (req, res) => {
  res.send({ message: 'API Artisanat Tunisien - Bienvenue !' });
});

// Routes API
require('./src/api/routes/routes')(app);

// Demarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
