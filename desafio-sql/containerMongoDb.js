import { MongoClient } from "mongodb";
import { MongoDbConfig } from "./config.js";
//------------------conectando con base mongo--------------------------------

//const uri = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0'
const client = new MongoClient(MongoDbConfig.uri)
await client.connect()
const dbEcommerse = client.db(MongoDbConfig.database)

// const colProductos = dbEcommerse.collection('productos')
// const colMensajes = dbEcommerse.collection('mensajes')

export default class ContainerMongoDb {
    constructor(collection) {
        this.collection = collection
    }

    async getAll() {
        const newCollection = dbEcommerse.collection(this.collection)
        const showAll = await newCollection.find().toArray()
        return showAll
    }
    async getById(newId) {
        const newCollection = dbEcommerse.collection(this.collection)
        const actualNewId = parseInt(newId)
        const unProducto = await newCollection.findOne({ id: actualNewId })
        return unProducto
    }
    async addNewItem(newId, obj) {
        const newCollection = dbEcommerse.collection(this.collection)
        //agregando objeto
        await newCollection.insertOne({ id: newId, ...obj })
        //retorna la nueva lista
        return await newCollection.find().toArray()
    }
    async modifyById(newId, obj) {
        const newCollection = dbEcommerse.collection(this.collection)
        const modificado = await newCollection.updateOne({ id: newId }, obj)
    }
    async deleteById(newId) {
        const newCollection = dbEcommerse.collection(this.collection)
        const eliminado = await newCollection.deleteOne({ id: newId })
        return eliminado
    }
}
