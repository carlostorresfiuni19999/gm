const mongoose= require("mongoose");
const Schema = mongoose.Schema;


// Esquema para el producto
const productoSchema = new Schema({
    categoria: {
      type: Schema.Types.ObjectId,
      ref: 'Categoria',
      cascade: 'delete'
    },
    nombre: {
      type: String,
      maxlength: 64,
      required: true,
    },
    descripcion: {
      type: String,
      maxlength: 256,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    imagen: {
      data: Buffer,
      contentType: String,
    },
  });

  const Producto  = mongoose.model('Producto', productoSchema);

  module.exports = Producto;