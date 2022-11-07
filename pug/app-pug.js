const express = require('express');
const ApiProducts = require('../(old)desafios-3-y-4/apiProducts');


//llamanado funciones
const app = express()
const apiProducts = new ApiProducts();

const PORT = 8080;

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//seteando plantillas y motor
app.set('views', './views');
app.set('view engine', 'pug');



//configurando las peticiones para este servidor

app.get('/', (req, res) => {
    res.render('index', { title: "Hola desde pug engine" })
})

app.get('/productos', (req, res) => {
    const array = apiProducts.getAll()
    let mesActual = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(new Date());
    let actualYear = new Date().getFullYear()
    let fechaActual = `${mesActual} ${actualYear}`//fecha dinámica para el caption de table
    res.render('productos', { title: "Lista de productos con Pug!", products: array, fecha: fechaActual })
})

app.post('/', (req, res) => {
    apiProducts.addNewProd(req.body)
    res.redirect('/')
})

//ejercicio de prueba
app.get('/meter', (req, res) => {
    //meter?min=5&nivel=15&max=20&title=<i>meter</i>
    res.render('medidor', req.query);
})


//Ejecutando el servidor en sí

app.listen(PORT, console.log(`running pug server in http://localhost:${PORT}`));