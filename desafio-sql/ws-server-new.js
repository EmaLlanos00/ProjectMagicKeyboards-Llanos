import express from "express";
import ContainerSql from "./containerSql.js";
import { MysqlConfig, SqliteConfig, MongoDbConfig } from './config.js'
import { Server as IoServer } from "socket.io";
import { Server as HttpServer } from "http";
import ContainerMongoDb from "./containerMongoDb.js";
import { normalize, schema } from "normalizr"
import cookieParser from "cookie-parser";
// const { Server: HttpServer } = require('http')
// const { Server: IoServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app);
const ioServer = new IoServer(httpServer);

const DbProds = new ContainerSql(MysqlConfig, 'productos')
const DbMsgs = new ContainerSql(SqliteConfig, 'mensajes')
const NewDbMsgs = new ContainerMongoDb(MongoDbConfig.collection)

app.use(express.static('public'))

httpServer.listen(8080, () => { console.log('Running ws server in http://localhost:8080') })

ioServer.on('connection', async (socket) => {
    console.log('alguien se ha conectado')

    const dataProds = await DbProds.readDB()

    const newMsgs = await NewDbMsgs.getAll()

    const cleanedMsgs = newMsgs.map(item => item.id)
    const objToNormalize = { id: 'mensajes', mensajes: cleanedMsgs }

    const authorEntity = new schema.Entity('users')
    const messagesEntity = new schema.Entity('messages', {
        author: authorEntity
    }, { idAttribute: 'text' })
    const array = new schema.Entity('array', {
        mensajes: [messagesEntity]
    })
    const normalizedData = normalize(objToNormalize, array)

    socket.emit('items', dataProds)


    socket.on('addNewProd', async (data) => {

        await DbProds.saveInDB(data)
        console.log(`Agregado item ${data.title}`)
        const aux = await DbProds.readDB()
        ioServer.sockets.emit('items', aux);

    })
    //----------------------------------------------------

    socket.emit('chats', normalizedData)

    socket.on('addNewMsg', async (data) => {

        await NewDbMsgs.addNewItem(data)
        console.log(`Recibido nuevo mensaje de ${data.author.id}`)
        const aux = await NewDbMsgs.getAll()

        const cleanedMsgs = aux.map(item => item.id)
        const objToNormalize = { id: 'mensajes', mensajes: cleanedMsgs }

        const authorEntity = new schema.Entity('users')
        const messagesEntity = new schema.Entity('messages', {
            author: authorEntity
        }, { idAttribute: 'text' })
        const array = new schema.Entity('array', {
            mensajes: [messagesEntity]
        })
        const newNormData = normalize(objToNormalize, array)
        ioServer.sockets.emit('chats', newNormData)
    })
})

ioServer.on('error', err => { console.log(err) })