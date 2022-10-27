const fs = require('fs');

//CLASE Y MÉTODOS PARA PRODUCTOS

class Contenedor {

    constructor(fileRoute) {

        this.fileRoute = fileRoute

    }

    async save(object) {
        let dataArray = []
        let newId
        try {
            const data = await fs.promises.readFile(this.fileRoute, "utf-8")
            dataArray = JSON.parse(data)
            let dataIds = dataArray.map(item => item.id)
            newId = Math.max(...dataIds) + 1
            let newObj = {
                ...object,
                id: newId
            }
            dataArray.push(newObj)
            fs.writeFileSync(this.fileRoute, JSON.stringify(dataArray))
        }
        catch (err) {

            console.log('Error al leer el archivo', err)
            newId = null
        }
        return newId

    }

    async getById(number) {

        let dataArray = []

        try {
            const data = await fs.promises.readFile(this.fileRoute, "utf-8")
            dataArray = JSON.parse(data)
            let obj = dataArray.find(item => item.id === number)
            return obj
        }
        catch (err) {

            console.log('Error al leer el archivo')
            return null
        }
    }

    async getAll() {

        let dataArray = []
        try {
            const data = await fs.promises.readFile(this.fileRoute, "utf-8")
            dataArray = JSON.parse(data)
            return dataArray

        }
        catch (err) {

            console.log('Error al leer el archivo')
            return null
        }

    }

    async deleteById(number) {

        let dataArray = []
        try {
            const data = await fs.promises.readFile(this.fileRoute, "utf-8")
            dataArray = JSON.parse(data)
            let newArray = dataArray.filter(item => item.id !== number)
            fs.writeFileSync(this.fileRoute, JSON.stringify(newArray))
            return `Eliminaste item id:${number}`

        }
        catch (err) {

            console.log('Error al leer el archivo')

        }
    }
    deleteAll() {
        fs.writeFileSync(this.fileRoute, "")
    }
}

let products = new Contenedor("./productos.txt")

// INICIALIZANDO SERVIDOR Y SUS RUTAS GET

const express = require("express");
const app = express();

app.get('/', (req, res) => {
    res.send(`<h1 style='color: blue;'>Hola desde express!</h1>
                <ul><li>"/productos": mostrará todos los productos en DB</li>
                <li>"/productoRandom": monstrará un producto aleatorio de DB</li></ul>`)
})


app.get('/productos', (req, res) => {
    products.getAll().then(response => res.send([...response]))
})
app.get('/productoRandom', (req, res) => {
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
    const data = fs.readFileSync('./productos.txt', "utf-8")
    let dataArray = JSON.parse(data)
    let dataIds = dataArray.map(item => item.id)
    let idCeil = Math.max(...dataIds) + 1
    let randomId = getRandomInt(1, idCeil)
    products.getById(randomId).then(response => res.send({ ...response }))
})

const PORT = 8080;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))