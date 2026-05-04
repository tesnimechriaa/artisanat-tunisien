const db = require('../../database/db.config');
const Produit = db.produits;

// ajouter un nouveau produit
exports.create = (req, res) => {
  if (!req.body.nom || !req.body.prix || !req.body.categorie) {
    res.status(400).send({
      message: 'Le nom, le prix et la categorie sont obligatoires'
    });
    return;
  }

  const produit = new Produit({
    nom: req.body.nom,
    description: req.body.description || '',
    prix: req.body.prix,
    stock: req.body.stock || 0,
    image: req.body.image || '',
    origine: req.body.origine || '',
    categorie: req.body.categorie
  });

  produit
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la creation du produit'
      });
    });
};

// recuperer tous les produits avec leur categorie (populate)
exports.findAll = (req, res) => {
  const nom = req.query.nom;
  const categorie = req.query.categorie;

  // construction du filtre dynamique
  var condition = {};
  if (nom) {
    condition.nom = { $regex: new RegExp(nom), $options: 'i' };
  }
  if (categorie) {
    condition.categorie = categorie;
  }

  Produit.find(condition)
    .populate('categorie')
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la recuperation des produits'
      });
    });
};

// recuperer un produit par son id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Produit.findById(id)
    .populate('categorie')
    .then(data => {
      if (!data) {
        res.status(404).send({ message: 'Produit introuvable avec id ' + id });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({ message: 'Erreur lors de la recuperation du produit' });
    });
};

// modifier un produit
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: 'Les donnees ne peuvent pas etre vides' });
  }

  const id = req.params.id;

  Produit.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
    .then(data => {
      if (!data) {
        res.status(404).send({ message: 'Produit introuvable avec id ' + id });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({ message: 'Erreur lors de la modification' });
    });
};

// supprimer un produit
exports.delete = (req, res) => {
  const id = req.params.id;

  Produit.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: 'Produit introuvable avec id ' + id });
      } else {
        res.send({ message: 'Produit supprime avec succes' });
      }
    })
    .catch(err => {
      res.status(500).send({ message: 'Erreur lors de la suppression' });
    });
};
