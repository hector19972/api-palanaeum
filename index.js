const express = require("express");
const bodyParser = require("body-parser");
const misrutas= require('./routes/rutas')
const cors =require('cors');

const app = express(); //Crea el servidor
app.use(cors())
const port=process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/',misrutas);
app.use(express.static(__dirname+'/public/'));

app.listen(port, () => {
  console.log(`Servidor en ejecucion en http://localhost:${port}`);
})

