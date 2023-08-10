const Categoria  = require('../models/CategoriaSchema');

// Obtener todas las categorías
const getAllCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva categoría
const createCategoria = async (req, res) => {
  try {
    console.log(req.body);
    const { nombre } = req.body;

    // Verificar si la categoría ya existe
    const categoriaExistente = await Categoria.findOne({ nombre });
    if (categoriaExistente) {
      return res.status(400)
        .json({ error: 'La categoría ya existe.' });
    }

    const nuevaCategoria = new Categoria({ nombre });
    await nuevaCategoria.save();
    res.status(200).json({ message: 'Categoría creada exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        const exist = await Categoria.findOne({nombre : nombre});

        if(exist){
           return res.status(400).json({message: 'Ya existe la categoria que quieres cargar'});
        }
        
        const upd = await Categoria.findByIdAndUpdate(id, {nombre : nombre })

        if(upd){
          res.status(200).send();
        } else {
          res.status(404).send();
        }


    } catch(e){
        console.log(e);
        res.status(500)
            .json({error: "No se pudo actualizar"})
    }
}
const deleteCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        
        const catDel = await Categoria.findById(id);

        if(catDel){
          await catDel.deleteOne();
          console.log("Borrado con exito");
          res.status(200).send();
        } else {
          res.status(404).send();
          console.log("No borrado");
        }
    }
    catch(e){
        console.log(e);
        res.status(500).json({error : 'Ocurrio un error al borrar'});
    }
}

module.exports = {
  getAllCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria
};
