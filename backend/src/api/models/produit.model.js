module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      nom: {
        type: String,
        required: true,
        trim: true
      },
      description: {
        type: String,
        default: ''
      },
      prix: {
        type: Number,
        required: true,
        min: 0
      },
      stock: {
        type: Number,
        default: 0,
        min: 0
      },
      image: {
        type: String,
        default: ''
      },
      origine: {
        type: String,
        default: ''
      },
      // reference vers la collection categories pour populate()
      categorie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categorie',
        required: true
      }
    },
    { timestamps: true }
  );

  // transforme _id en id pour le frontend Angular
  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Produit = mongoose.model('produit', schema);
  return Produit;
};
