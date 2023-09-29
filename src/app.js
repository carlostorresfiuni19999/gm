const express = require('express');
const mongoose = require('mongoose');
const categoriasRouter = require('./routers/CategoriasRouter');
const productosRouter = require('./routers/ProductosRouter');
const ordenesRouter = require('./routers/OrdenesRouter');
const cors = require('cors')

//Constantes
const app = express();
const corsPolicy = {
    origin: '*'
}

//Variables de configuracion
const PORT = 3000;
const DBURI = `mongodb://127.0.0.1:27017/gm`;


//Middleware
app.use(express.json());
app.use(cors(corsPolicy))
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
.catch(e => console.log("Error, connection fail", e));




app.listen(PORT, () => {
    console.log("Running in port "+PORT);
});



