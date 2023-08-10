const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Esquema para la categoría
const categoriaSchema = new Schema({
  nombre: {
    type: String,
    maxlength: 64,
    required: true,
  }
});

const Categoria = mongoose.model('Categoria', categoriaSchema);
module.exports = Categoria;