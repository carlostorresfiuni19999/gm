const express = require('express');
const router = express.Router();
const ordenesController = require('../controllers/OrdenesController');

// Rutas de las órdenes
router.get('/ordenes', ordenesController.obtenerOrdenes);
router.get('/ordenes/:id', ordenesController.obtenerOrdenPorId);
router.post('/ordenes', ordenesController.crearOrden);
router.put('/ordenes/:id', ordenesController.actualizarOrden);
router.delete('/ordenes/:id', ordenesController.eliminarOrden);

module.exports = router;