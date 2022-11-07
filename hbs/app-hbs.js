const express = require('express');
const { engine } = require('express-handlebars');
const ApiProducts = require('../(old)desafios-3-y-4/apiProducts')

//llamando funciones
const app = express()
const apiProducts = new ApiProducts();

const PORT = 3000

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//configurando el motor
app.engine("hbs", engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views"
})
)

//seteando plantillas y motor
app.set('views', './views');
app.set('view engine', 'hbs');

//configurando las peticiones para este servidor

app.get('/', (req, res) => {
    res.render('form', { pageTitle: 'Hbs form', title: 'Hola desde hbs!' })
})

app.get('/productos', (req, res) => {
    const array = apiProducts.getAll()
    let mesActual = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(new Date());
    let actualYear = new Date().getFullYear()
    let fechaActual = `${mesActual} ${actualYear}`//fecha dinámica para el caption de table
    res.render('productos', { pageTitle: 'Lista de productos', title: 'Lista de productos desde Hbs!', productos: array, fecha: fechaActual })
})

app.post('/', (req, res) => {
    apiProducts.addNewProd(req.body)
    res.redirect('/')
})

//Ejecutando el servidor en sí

app.listen(PORT, console.log(`running hbs server in http://localhost:${PORT}`));