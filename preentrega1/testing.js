import ContMongo from "./contenedores/contMongo.js";


const productos = new ContMongo('productos')
console.log('hola')
productos.getAll().then(res => console.log(res))

//import ContFirebase from "./contFirebase.js";
//const colores = new ContFirebase('colores')

// import ColoresDaoFirebase from "../daos/productos/firebaseDao.js"
// const colores = new ColoresDaoFirebase()
// console.log('hola')
// colores.modifyById({ colores: "blue" }, 2)
// colores.getAll().then(res => console.log(res))
//colores.getById(2).then(res => console.log(res))
//colores.addNewItem({ nombre: "violet" }, 3).then(res => console.log(res))
//colores.deleteById(2).then(res => console.log(res))
