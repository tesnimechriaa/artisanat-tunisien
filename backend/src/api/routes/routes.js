module.exports = app => {
  const categories = require('../controllers/categorie.controller');
  const produits = require('../controllers/produit.controller');
  const router = require('express').Router();

  // routes pour les categories
  router.post('/categories', categories.create);
  router.get('/categories', categories.findAll);
  router.get('/categories/:id', categories.findOne);
  router.put('/categories/:id', categories.update);
  router.delete('/categories/:id', categories.delete);

  // routes pour les produits
  router.post('/produits', produits.create);
  router.get('/produits', produits.findAll);
  router.get('/produits/:id', produits.findOne);
  router.put('/produits/:id', produits.update);
  router.delete('/produits/:id', produits.delete);

  // prefixe de toutes les routes API
  app.use('/api', router);
};
