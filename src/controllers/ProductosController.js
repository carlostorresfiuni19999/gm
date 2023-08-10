const Producto = require('../models/ProductoSchema');
const Categoria = require('../models/CategoriaSchema');
const sharp = require('sharp');

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un producto por su ID
const obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo producto
const crearProducto =  async (req, res) => {
  try {
    const { categoria, nombre, descripcion, precio } = req.body;
    const image = req.file;

    // Verificar si la categoría existe antes de agregar el producto
    const categoriaExistente = await Categoria.findById(categoria);
    if (!categoriaExistente) {
      return res.status(404).json({ error: 'Categoría no encontrada.' });
    }

    // Procesar la imagen usando la biblioteca sharp
    const imagenProcesada = await sharp(image.buffer)
      .resize(300, 300) // Ajusta el tamaño de la imagen según tus necesidades
      .toBuffer();

    const nuevoProducto = new Producto({
      categoria,
      nombre,
      descripcion,
      precio,
      imagen: {
        data: imagenProcesada,
        contentType: image.mimetype,
      },
    });

    await nuevoProducto.save();
    res.status(201).json({ message: 'Producto creado exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un producto por su ID
const actualizarProducto =  async (req, res) => {
  try {
    const { categoria, nombre, descripcion, precio } = req.body;
    const image = req.file;

    // Verificar si la categoría existe antes de actualizar el producto
    const categoriaExistente = await Categoria.findById(categoria);
    if (!categoriaExistente) {
      return res.status(404).json({ error: 'Categoría no encontrada.' });
    }

    // Procesar la nueva imagen usando la biblioteca sharp, solo si se proporciona una nueva imagen
    let imagenProcesada;
    if (image) {
      imagenProcesada = await sharp(image.buffer)
        .resize(300, 300) // Ajusta el tamaño de la imagen según tus necesidades
        .toBuffer();
    }

    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      {
        categoria,
        nombre,
        descripcion,
        precio,
        // Actualizar la imagen solo si se proporciona una nueva imagen
        ...(image && {
          imagen: {
            data: imagenProcesada,
            contentType: image.mimetype,
          },
        }),
      },
      { new: true }
    );

    if (!productoActualizado) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    res.json(productoActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un producto por su ID
const eliminarProducto = async (req, res) => {
  try {
    const productoEliminado = await Producto.findByIdAndRemove(req.params.id);
    if (!productoEliminado) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }
    res.json({ message: 'Producto eliminado exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};
