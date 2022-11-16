const { response } = require('express');
const express = require('express')
const ItemContainer = require('./apiServer')
const { Router } = express;

//invocando los elementos importados
const app = express()
const prodRouter = new Router()
const cartRouter = new Router()
const productos = new ItemContainer('./productos.txt')
const carritos = new ItemContainer('./carritos.txt')

const PORT = process.env.port || 8080

//middlewares!
prodRouter.use(express.json())
cartRouter.use(express.json())
let admin = false
const youShallNotPass = (req, res, next) => {
    if (admin) {
        next()
    } else {
        res.sendStatus(403)

    }
}

//acciones del server
app.get('/login', (req, res) => {
    admin = true
    res.sendStatus(200)
})

app.get('/logout', (req, res) => {
    admin = false
    res.sendStatus(200)
})

prodRouter.get('/', (req, res) => {

    productos.getAll().then(response => res.json(JSON.parse(response)))

})

prodRouter.get('/:id', (req, res) => {
    productos.getById(req.params.id).then(response => res.json(response))

})

//las operaciones de abajo son solo para admins!

prodRouter.post('/', youShallNotPass, (req, res) => {

    productos.addNewItem(req.body).then(response => res.json(response))

})

prodRouter.put('/:id', youShallNotPass, (req, res) => {
    productos.modifyById(req.params.id, req.body).then(response => res.json(response))

})

prodRouter.delete('/:id', youShallNotPass, (req, res) => {
    productos.deleteById(req.params.id).then(response => res.json(response))

})

//------------------------------------
cartRouter.post('/', (req, res) => {
    carritos.addNewItem(req.body).then(response => res.json({ "new cart id": response.id }))

})

cartRouter.delete('/:id', (req, res) => {
    carritos.deleteById(req.params.id).then(response => res.json(response))

})
cartRouter.get('/:id/productos', (req, res) => {
    carritos.getById(req.params.id).then(response => res.json(response))
    //res.json(carritos.getById(req.params.id))
})

cartRouter.post('/:id/productos/:id_prod', (req, res) => {
    let newProd
    let oldCart

    async function fetch() {

        await productos.getById(req.params.id_prod).then(response => newProd = response)
        await carritos.getById(req.params.id).then(response => {
            oldCart = response
            oldCart.productos.push(newProd)
            carritos.modifyById(req.params.id, oldCart).then(response => res.json(response))
        })

    }
    fetch();


})

cartRouter.delete('/:id/productos/:id_prod', (req, res) => {
    //difícil
    let oldCart

    async function fetch() {
        //función que elimina el primer item del carrito que coincida con los datos provistos

        await carritos.getById(req.params.id).then(response => {
            oldCart = response
            for (let i = 0; i < oldCart.productos.length; i++) {

                if (oldCart.productos[i].id == req.params.id_prod) {

                    oldCart.productos.splice(i, 1)
                    break
                }
            }
            carritos.modifyById(req.params.id, oldCart).then(response => res.json(response))
        })

    }
    fetch();
})

app.use('/api/productos', prodRouter)
app.use('/api/carrito', cartRouter)

app.all('*', (req, res) => {
    res.status(404).json({ "error": "ruta inexistente" })
})

const server = app.listen(PORT, () => {
    console.log(`MagicKeyboards server listening in port http://localhost:${PORT}`)
})
