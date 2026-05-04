const db = require('../../database/db.config');
const Categorie = db.categories;

// ajouter une nouvelle categorie
exports.create = (req, res) => {
  if (!req.body.nom) {
    res.status(400).send({ message: 'Le nom de la categorie est obligatoire' });
    return;
  }

  const categorie = new Categorie({
    nom: req.body.nom,
    description: req.body.description || '',
    image: req.body.image || ''
  });

  categorie
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la creation de la categorie'
      });
    });
};

// recuperer toutes les categories
exports.findAll = (req, res) => {
  const nom = req.query.nom;
  // si on passe ?nom=xxx on filtre, sinon on retourne tout
  var condition = nom ? { nom: { $regex: new RegExp(nom), $options: 'i' } } : {};

  Categorie.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la recuperation des categories'
      });
    });
};

// recuperer une categorie par son id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Categorie.findById(id)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: 'Categorie introuvable avec id ' + id });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({ message: 'Erreur lors de la recuperation de la categorie' });
    });
};

// modifier une categorie
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: 'Les donnees ne peuvent pas etre vides' });
  }

  const id = req.params.id;

  Categorie.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
    .then(data => {
      if (!data) {
        res.status(404).send({ message: 'Categorie introuvable avec id ' + id });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({ message: 'Erreur lors de la modification' });
    });
};

// supprimer une categorie
exports.delete = (req, res) => {
  const id = req.params.id;

  Categorie.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({ message: 'Categorie introuvable avec id ' + id });
      } else {
        res.send({ message: 'Categorie supprimee avec succes' });
      }
    })
    .catch(err => {
      res.status(500).send({ message: 'Erreur lors de la suppression' });
    });
};
