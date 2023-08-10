const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/CategoriasController');

// Rutas de las categorías
router.get('/categorias', categoriasController.getAllCategorias);
router.post('/categorias', categoriasController.createCategoria);
router.delete('/categorias/:id', categoriasController.deleteCategoria);
router.put('/categorias/:id', categoriasController.updateCategoria);

module.exports = router;
