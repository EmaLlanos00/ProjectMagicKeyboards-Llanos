const express = require("express");
const app = express();
const ApiProducts = require("./apiProducts.js")//Llamando a clase con métodos y array "memoria"

app.use(express.static("public"))

const { Router } = express;

const apiProducts = new ApiProducts(); //Utilizando el constructor de apiProducts.js

const productRouter = new Router();

const PORT = 8080

productRouter.use(express.json()) //middleware, without this line, newArray recieves "null" instead of a new objet with "POST" method.
productRouter.use(express.urlencoded({ extended: true })); // another middleware, this one is important to allow form data to be used/read by API. 

//Operaciones get, put, delete, post

productRouter.get("/", (req, res) => {
    res.json(apiProducts.getAll())
})

productRouter.get("/:id", (req, res) => {

    res.json(apiProducts.getById(req.params.id))
})

productRouter.post("/", (req, res) => {

    res.json(apiProducts.addNewProd(req.body));
})

productRouter.put("/:id", (req, res) => {

    res.json(apiProducts.modifyById(req.params.id, req.body));
})

productRouter.delete("/:id", (req, res) => {

    res.json(apiProducts.deleteById(req.params.id))
})

app.use("/api/productos", productRouter)


const server = app.listen(PORT, () => {
    console.log(`Http server listening in port ${server.address().port}`)
})