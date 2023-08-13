const express = require('express');
const mongoose = require('mongoose');
const categoriasRouter = require('./routers/CategoriasRouter');
const productosRouter = require('./routers/ProductosRouter');
const ordenesRouter = require('./routers/OrdenesRouter');

//Constantes
const app = express();

//Variables de configuracion
const PORT = 3000;
const DBURI = `mongodb://localhost:27017`;


//Middleware
app.use(express.json());

//Routers
app.use('/api', categoriasRouter);
app.use('/api', productosRouter);
app.use('/api', ordenesRouter);
app.get('/', (req, res) => res.json({msg: "Hola Mundo"}));

//Static Pages
app.use(express.static('public'));



//Execute
mongoose.connect(DBURI)
.then(_ => console.log("Connected to db"))
.catch(_ => console.log("Error, connection fail"));




app.listen(PORT, () => {
    console.log("Running in port "+PORT);
});



