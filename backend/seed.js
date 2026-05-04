// script pour inserer les donnees de demonstration
// utilisation : node seed.js
const db = require('./src/database/db.config');
const Categorie = db.categories;
const Produit = db.produits;

async function seed() {
  try {
    await db.mongoose.connect(db.url);
    console.log('connecte a la base de donnees');

    // on vide les collections avant pour eviter les doublons
    await Categorie.deleteMany({});
    await Produit.deleteMany({});
    console.log('collections videes');

    // creation des categories
    const categories = await Categorie.insertMany([
      {
        nom: 'Vetements traditionnels',
        description: 'Habits authentiques tunisiens : Jebba, Burnous, Foutta',
        image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600'
      },
      {
        nom: 'Vannerie et Maroquinerie',
        description: 'Couffins, paniers et sacs tresses a la main',
        image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600'
      },
      {
        nom: 'Ceramique et Poterie',
        description: 'Plats de Nabeul, vases berberes de Sejnane',
        image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600'
      },
      {
        nom: 'Gastronomie',
        description: 'Huile olive de Sfax, harissa, dattes Deglet Nour',
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600'
      },
      {
        nom: 'Bijouterie et Cosmetique',
        description: 'Khomsa argent, eau fleur oranger, savon olive',
        image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=600'
      }
    ]);
    console.log(categories.length + ' categories inserees');

    // creation des produits relies aux categories
    const produits = [
      {
        nom: 'Jebba Tunisienne pour Femme',
        description: 'Jebba 100% tunisienne brodee a la main, parfaite pour les ceremonies et les fetes traditionnelles',
        prix: 180,
        stock: 15,
        image: 'https://www.vuededesert.com/wp-content/uploads/2023/06/3d6abd1527a7e3a30c2d6b6c551cf410.jpg',
        origine: 'Tunis',
        categorie: categories[0]._id
      },
      {
        nom: 'Jebba Tunisienne pour Homme',
        description: 'Jebba traditionnelle pour homme en lin avec broderies authentiques',
        prix: 160,
        stock: 20,
        image: 'https://images.unsplash.com/photo-1622445275576-721325763afe?w=600',
        origine: 'Tunis',
        categorie: categories[0]._id
      },
      {
        nom: 'Foutta de Hammam',
        description: 'Serviette traditionnelle en coton tisse pour hammam et plage',
        prix: 35,
        stock: 50,
        image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600',
        origine: 'Ksar Hellal',
        categorie: categories[0]._id
      },
      {
        nom: 'Couffin en Alfa',
        description: 'Panier traditionnel tresse en alfa, ideal pour le marche ou la plage',
        prix: 45,
        stock: 30,
        image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600',
        origine: 'Nabeul',
        categorie: categories[1]._id
      },
      {
        nom: 'Sac en Cuir Tresse',
        description: 'Sac a main en cuir veritable tresse a la main par nos artisans',
        prix: 120,
        stock: 12,
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600',
        origine: 'Kairouan',
        categorie: categories[1]._id
      },
      {
        nom: 'Plat de Nabeul Decoratif',
        description: 'Plat en ceramique peint a la main avec motifs traditionnels de Nabeul',
        prix: 65,
        stock: 18,
        image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600',
        origine: 'Nabeul',
        categorie: categories[2]._id
      },
      {
        nom: 'Vase Berbere de Sejnane',
        description: 'Poterie berbere fabriquee selon une tradition millenaire (UNESCO)',
        prix: 90,
        stock: 8,
        image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600',
        origine: 'Sejnane',
        categorie: categories[2]._id
      },
      {
        nom: 'Tajine Decore',
        description: 'Tajine en terre cuite decore, parfait pour cuisiner a la traditionnelle',
        prix: 75,
        stock: 10,
        image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600',
        origine: 'Nabeul',
        categorie: categories[2]._id
      },
      {
        nom: 'Huile Olive Extra Vierge de Sfax',
        description: 'Huile olive premiere pression a froid, recoltee dans les oliveraies de Sfax',
        prix: 40,
        stock: 100,
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600',
        origine: 'Sfax',
        categorie: categories[3]._id
      },
      {
        nom: 'Harissa Artisanale',
        description: 'Pate de piment epicee preparee selon la recette traditionnelle tunisienne',
        prix: 15,
        stock: 80,
        image: 'https://images.unsplash.com/photo-1599909533919-2f5acff52ee6?w=600',
        origine: 'Nabeul',
        categorie: categories[3]._id
      },
      {
        nom: 'Dattes Deglet Nour de Kebili',
        description: 'Dattes premium recoltees dans les oasis de Kebili, sucrees et fondantes',
        prix: 25,
        stock: 60,
        image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600',
        origine: 'Kebili',
        categorie: categories[3]._id
      },
      {
        nom: 'Khomsa en Argent',
        description: 'Pendentif main de Fatma en argent 925, symbole de protection',
        prix: 55,
        stock: 25,
        image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=600',
        origine: 'Tunis',
        categorie: categories[4]._id
      },
      {
        nom: 'Eau de Fleur Oranger',
        description: 'Eau florale distillee a partir des fleurs orangers de Nabeul',
        prix: 18,
        stock: 45,
        image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=600',
        origine: 'Nabeul',
        categorie: categories[4]._id
      },
      {
        nom: 'Savon a Huile Olive',
        description: 'Savon naturel fabrique avec huile olive bio, sans conservateurs',
        prix: 8,
        stock: 100,
        image: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=600',
        origine: 'Sfax',
        categorie: categories[4]._id
      }
    ];

    const produitsInseres = await Produit.insertMany(produits);
    console.log(produitsInseres.length + ' produits inseres');

    console.log('seed termine avec succes');
    process.exit(0);
  } catch (err) {
    console.log('erreur lors du seed :', err);
    process.exit(1);
  }
}

seed();
