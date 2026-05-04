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
      image: {
        type: String,
        default: ''
      }
    },
    { timestamps: true }
  );

  // transforme _id en id et supprime __v dans la reponse JSON
  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Categorie = mongoose.model('categorie', schema);
  return Categorie;
};
