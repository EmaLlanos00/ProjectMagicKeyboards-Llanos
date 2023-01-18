import { MongoClient } from "mongodb";

//------------------conectando con base mongo--------------------------------

const uri = 'mongodb+srv://emanuelDb:emanuellls@cluster0.zp6igpt.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri)
await client.connect()
const chosenDb = client.db('authCoder')

export default class ContMongo {
    constructor(collection) {
        this.collection = collection
    }

    async getAll() {
        const newCollection = chosenDb.collection(this.collection)
        const showAll = await newCollection.find().toArray()
        return showAll
    }
    async getUser(name) {
        const newCollection = chosenDb.collection(this.collection)
        const usuario = await newCollection.findOne({ username: name })
        return usuario
    }
    async getUserById(id) {
        const newCollection = chosenDb.collection(this.collection)
        const usuario = await newCollection.findOne({ id: id })
        return usuario
    }
    async addNewItem(obj) {
        const newCollection = chosenDb.collection(this.collection)
        //agregando objeto
        await newCollection.insertOne(obj)
        //retorna la nueva lista
        return await newCollection.find().toArray()
    }
    /* async modifyById(newId, obj) {
        const newCollection = chosenDb.collection(this.collection)
        const modificado = await newCollection.updateOne({ id: newId }, obj)
    } */
    async deleteUser(name) {
        const newCollection = chosenDb.collection(this.collection)
        const eliminado = await newCollection.deleteOne({ username: name })
        return eliminado
    }
}