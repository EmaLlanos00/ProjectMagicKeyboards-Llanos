const express = require('express')
const Contenedor = require('./fileEditor')
const { Server: HttpServer } = require('http')
const { Server: IoServer } = require('socket.io')

const app = express();
const httpServer = new HttpServer(app);
const ioServer = new IoServer(httpServer);

const products = new Contenedor('./productos.txt');
const messages = new Contenedor('./mensajes.txt')

app.use(express.static('public'))

httpServer.listen(8080, () => { console.log('Running ws server in http://localhost:8080') })

//obteniendo datos de productos y usando arrayProds como contenedor auxiliar
let arrayProds = []
products.getAll().then(res => arrayProds = [...JSON.parse(res)])

let arrayMsgs = []
messages.getAll().then(res => arrayMsgs = [...JSON.parse(res)])


ioServer.on('connection', (socket) => {
    console.log('alguien se ha conectado')
    socket.emit('items', arrayProds)


    socket.on('addNewProd', (data) => {

        //Me parece horrible cómo se anidan tantos callbacks acá pero de otra manera no se actualiza la tabla del cliente sin reiniciar el server
        products.addNewItem(data)
            .then(res => {

                console.log(`Agregado item ${res.title}`);
                products.getAll()
                    .then(res => {
                        arrayProds = [...JSON.parse(res)];
                        ioServer.sockets.emit('items', arrayProds);
                    });

            })

    })
    //----------------------------------------------------
    socket.emit('chats', arrayMsgs)

    socket.on('addNewMsg', (data) => {
        messages.addNewItem(data)
            .then(res => {
                console.log(`Recibido nuevo mensaje de ${res.email}`);
                messages.getAll()
                    .then(res => {
                        arrayMsgs = [...JSON.parse(res)];
                        ioServer.sockets.emit('chats', arrayMsgs)
                        console.log(arrayMsgs)
                    })
            })
    })
})


ioServer.on('error', err => { console.log(err) })
