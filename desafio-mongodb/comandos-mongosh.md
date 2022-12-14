# Mongoshell CRUD

## Comandos de colección 'mensajes'

- Crear database con `use ecommerse`
- Crear colecciones: `db.createCollection("mensajes")`
- `show collections`
- Agregando un item: `db.mensajes.insertOne({email:"mail@ejemplo.com",
 msg: "hola desde mongoshell", date: "fecha"})`
- Agregando varios elementos: `db.mensajes.insertMany([{email:"mail@ejemplo.com",
 msg: "hola desde mongoshell", date: "fecha"},{email:"mail@ejemplo.com",
 msg: "hola desde mongoshell", date: "fecha"},{email:"mail@ejemplo.com",
 msg: "hola desde mongoshell", date: "fecha"}])`
 - Mostrar (leer) documentos: `db.mensajes.find().pretty()`

## Comandos de colección 'productos'
- `db.createCollection("productos")`
- Agregar elementos: `db.productos.insertMany(
    [{title:"keyboard yellow", price: 2700, thumbnail: "https://i.ibb.co/VVMxyyf/jri165-teclado-yellow.jpg", id: 1},
    {title:"keyboard navy black", price: 5400, thumbnail: "https://i.ibb.co/VVMxyyf/jri165-teclado-yellow.jpg", id: 2},
    {title:"keyboard maroon black, price: 1200, thumbnail: "https://i.ibb.co/VVMxyyf/jri165-teclado-yellow.jpg", id: 3},
    {title:"keycaps pbt green", price: 590, thumbnail: "https://i.ibb.co/VVMxyyf/jri165-teclado-yellow.jpg", id: 4},
    {title:"keycaps pbt violet", price: 270, thumbnail: "https://i.ibb.co/VVMxyyf/jri165-teclado-yellow.jpg", id: 5},
    {title:"keycaps pbt black", price: 360, thumbnail: "https://i.ibb.co/VVMxyyf/jri165-teclado-yellow.jpg", id: 6}])`
- Mostrar (leer) documentos: `db.mensajes.find().pretty()`
- Actualizar todos los docs: `db.productos.updateMany({},{$set:{stock:100}})`
- Actualizando algunos documentos: `db.productos.updateMany({"price":{$gt:4000}},{$set:{stock:0}})`
- Eliminando docs:    `db.productos.deleteMany({"price":{$lt:1000}})`
- Creando usuario de solo lectura: `ecommerse> use admin
admin> db.createUser({user:"pepe", pwd:"asd123",roles:[{role:"read",db:"ecommerse"}]})`

## Galería
- ![](https://i.ibb.co/gdSGWF7/mongoSS1.png)
 > Creando las databases, agregando contenido a "mensajes"
- ![](https://i.ibb.co/M73djyS/mongoSS2.png)
 > Lectura de documentos
- ![](https://i.ibb.co/rk7FXTv/mongoSS3.png)
 > Agregando items a "productos"
- ![](https://i.ibb.co/yFrxFxL/mongoSS4.png)
 > Mostrando elementos según diversos filtros
- ![](https://i.ibb.co/gW12yDS/mongoSS5.png)
 > Actualizando elementos, agregando stocks
- ![](https://i.ibb.co/F0zNWgn/mongoSS6.png)
 > Actualizar stock, borrado de elementos