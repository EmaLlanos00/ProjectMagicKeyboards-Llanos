const express = require('express');
const ApiProducts = require('../../(old)desafios-3-y-4/apiProducts')

//llamando funciones
const app = express()
const apiProducts = new ApiProducts();

const PORT = 5000

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//configurando ejs como motor
app.set('view engine', 'ejs')

//configurando las peticiones del server

app.get('/', (req, res) => {
    const array = apiProducts.getAll()
    res.render('index', { title: 'Hola desde EJS!', pageTitle: 'Ejs form', products: array });
})

app.get('/productos', (req, res) => {
    const array = apiProducts.getAll();
    res.render('index', { title: 'Lista de productos con EJS', pageTitle: 'Productos', products: array })
})

app.post('/', (req, res) => {
    apiProducts.addNewProd(req.body);
    res.redirect('/')
})

//inicializando servidor

app.listen(PORT, () => console.log(`ejs server running in http://localhost:${PORT}`))
