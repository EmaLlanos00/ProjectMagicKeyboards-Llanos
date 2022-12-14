import express from "express";
import ContainerSql from "./containerSql.js";
import { MysqlConfig, SqliteConfig } from './config.js'
import { Server as IoServer } from "socket.io";
import { Server as HttpServer } from "http";
// const { Server: HttpServer } = require('http')
// const { Server: IoServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app);
const ioServer = new IoServer(httpServer);

const DbProds = new ContainerSql(MysqlConfig, 'productos')
const DbMsgs = new ContainerSql(SqliteConfig, 'mensajes')

app.use(express.static('public'))

httpServer.listen(8080, () => { console.log('Running ws server in http://localhost:8080') })

ioServer.on('connection', async (socket) => {
    console.log('alguien se ha conectado')

    const dataProds = await DbProds.readDB()
    const dataMsgs = await DbMsgs.readDB()

    socket.emit('items', dataProds)


    socket.on('addNewProd', async (data) => {

        await DbProds.saveInDB(data)
        console.log(`Agregado item ${data.title}`)
        const aux = await DbProds.readDB()
        ioServer.sockets.emit('items', aux);

    })
    //----------------------------------------------------
    socket.emit('chats', dataMsgs)

    socket.on('addNewMsg', async (data) => {

        // DbMsgs.saveInDB(data)
        //     .then(res => {
        //         console.log(`Recibido nuevo mensaje de ${res.email}`);
        //         DbMsgs.readDB()
        //             .then(res => {

        //                 ioServer.sockets.emit('chats', res)
        //                 console.log(res)
        //             })
        //     })
        await DbMsgs.saveInDB(data)
        console.log(`Recibido nuevo mensaje de ${data.email}`)
        const aux = await DbMsgs.readDB()
        ioServer.sockets.emit('chats', aux)

    })
})

ioServer.on('error', err => { console.log(err) })