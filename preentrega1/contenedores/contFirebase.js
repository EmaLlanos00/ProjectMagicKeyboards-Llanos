import admin from 'firebase-admin';
import serviceAccount from '../project-magic-keyboards-firebase-adminsdk-ved2c-f0270f9962.json' assert {type: 'json'}

// let serviceAccount = import("../project-magic-keyboards-firebase-adminsdk-ved2c-f0270f9962.json")
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
//funciones crud
const db = admin.firestore();
export default class ContFirebase {
    constructor(collection) {
        this.collection = db.collection(collection)
    }

    async getAll() {

        try {
            const querySnapshot = await this.collection.get()
            let docs = querySnapshot.docs;

            const response = docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            return response
        }
        catch (error) {
            console.log(error)
        }
    }
    async getById(id) {

        try {
            const doc = this.collection.doc(`${id}`)
            const item = await doc.get()
            const response = { id: item, id, ...item.data() }
            return response
        } catch (error) { console.log(error) }

    }
    async addNewItem(obj, id) {

        try {
            let doc = this.collection.doc(`${id}`)
            await doc.create(obj)
            return 'item creado satisfactoriamente'

        } catch (error) {
            console.log(error)

        }
    }
    async modifyById(obj, id) {


        try {
            const doc = this.collection.doc(`${id}`);
            let item = await doc.update(obj)
            console.log('elemento actualizado')
            return item
        } catch (error) {
            console.log(error)
        }
    }
    async deleteById(id) {
        try {
            const doc = this.collection.doc(`${id}`)
            const item = await doc.delete()
            console.log("Elemento borrado")

        } catch (error) {
            console.log(error)
        }
    }
}
