const Orden = require('../models/OrdenCabeceraSchema');
const Producto = require('../models/ProductoSchema');

// Obtener todas las órdenes
const obtenerOrdenes = async (req, res) => {
  try {
    const ordenes = await Orden.find();
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una orden por su ID
const obtenerOrdenPorId = async (req, res) => {
  try {
    const orden = await Orden.findById(req.params.id);
    if (!orden) {
      return res.status(404).json({ message: 'Orden no encontrada.' });
    }
    res.json(orden);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva orden
const crearOrden = async (req, res) => {
  try {
    const { nombre, apellido, estado, detalles } = req.body;

    // Verificar que todos los detalles de pedido tengan productos válidos
    for (const detalle of detalles) {
      const productoExistente = await Producto.findById(detalle.producto);
      if (!productoExistente) {
        return res.status(404).json({ error: 'Producto no encontrado.' });
      }
    }

    const nuevaOrden = new Orden({
      nombre,
      apellido,
      estado,
      detalles,
    });

    await nuevaOrden.save();
    res.status(201).json({ message: 'Orden creada exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una orden por su ID
const actualizarOrden = async (req, res) => {
  try {
    const { nombre, apellido, estado, detalles } = req.body;

    // Verificar que todos los detalles de pedido tengan productos válidos
    for (const detalle of detalles) {
      const productoExistente = await Producto.findById(detalle.producto);
      if (!productoExistente) {
        return res.status(404).json({ error: 'Producto no encontrado.' });
      }
    }

    const ordenActualizada = await Orden.findByIdAndUpdate(
      req.params.id,
      {
        nombre,
        apellido,
        estado,
        detalles,
      },
      { new: true }
    );

    if (!ordenActualizada) {
      return res.status(404).json({ message: 'Orden no encontrada.' });
    }

    res.json(ordenActualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una orden por su ID
const eliminarOrden = async (req, res) => {
  try {
    const ordenEliminada = await Orden.findByIdAndRemove(req.params.id);
    if (!ordenEliminada) {
      return res.status(404).json({ message: 'Orden no encontrada.' });
    }
    res.json({ message: 'Orden eliminada exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  obtenerOrdenes,
  obtenerOrdenPorId,
  crearOrden,
  actualizarOrden,
  eliminarOrden,
};