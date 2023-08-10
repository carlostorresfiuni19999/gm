const express = require('express');
const multer = require('../controllers/ImagenesController');
const productoController = require('../controllers/ProductosController');

const router = express.Router();


router.get('/productos', productoController.obtenerProductos);
router.get('/get/:id', productoController.obtenerProductoPorId);
router.post('/productos', multer.single('image'), productoController.crearProducto);
router.put('/productos/:id', multer.single('image'), productoController.actualizarProducto);
router.delete('/productos/:id', productoController.eliminarProducto);

module.exports = router;
