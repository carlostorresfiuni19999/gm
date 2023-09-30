const express = require('express');
const mongoose = require('mongoose');
const categoriasRouter = require('./src/routers/CategoriasRouter');
const productosRouter = require('./src/routers/ProductosRouter');
const ordenesRouter = require('./src/routers/OrdenesRouter');
const cors = require('cors')

//Constantes
const app = express();
const corsPolicy = {
    origin: '*'
}

//Variables de configuracion
const PORT = 3000;
const DBURI = `mongodb+srv://gm:gm123456@gm.hy45blf.mongodb.net/?retryWrites=true&w=majority`;


//Middleware
app.use(express.json());
app.use(cors(corsPolicy))
//Routers
app.use('/api', categoriasRouter);
app.use('/api', productosRouter);
app.use('/api', ordenesRouter);

//Static Pages
app.use(express.static('public'));



//Execute
mongoose.connect(DBURI)
.then(_ => console.log("Connected to db"))
.catch(e => console.log("Error, connection fail", e));




app.listen(PORT, () => {
    console.log("Running in port "+PORT);
});



