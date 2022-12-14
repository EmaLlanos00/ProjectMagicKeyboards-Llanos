//import ContainerSql from "./containerSql.mjs"
import { MysqlConfig, SqliteConfig } from './config.js'
import knex from "knex"


const MysqlKnex = knex(MysqlConfig)
const SqliteKnex = knex(SqliteConfig)


const prodExist = await MysqlKnex.schema.hasTable('productos')
const msjExist = await SqliteKnex.schema.hasTable('mensajes')

if (!prodExist) {

    await MysqlKnex.schema.createTable('productos', (table) => {
        table.increments('id'),
            table.string('title'),
            table.integer('price'),
            table.string('thumbnail')
    })
    console.log('tabla no existía')
}

if (!msjExist) {

    await SqliteKnex.schema.createTable('mensajes', (table) => {
        table.increments('id'),
            table.string('email'),
            table.string('msg'),
            table.string('date')
    })
    console.log('tabla no existía')
}

// const DbProds = new ContainerSql(MysqlConfig, 'productos')
// const DbMsgs = new ContainerSql(SqliteConfig, 'mensajes')

// await knexClient.deleteByID('personas', 4)
// await DbMsgs.saveInDB([{ email: 'alguien@ejemplo.com', msg: 'hola soy un mensaje', date: 'alguna fecha' }])
// await DbProds.saveInDB([{ title: 'keyboard yellow', price: 70000, thumbnail: 'https://i.ibb.co/VVMxyyf/jri165-teclado-yellow.jpg' },
// { title: 'keyboard navy black', price: 75000, thumbnail: 'https://i.ibb.co/qg8sd4Q/jri165-teclado-navy-black.jpg' },
// { title: 'keyboard maroon black', price: 60000, thumbnail: 'https://i.ibb.co/R6DRq2N/jri165-teclado-maroon-black.jpg' }
// ])

// console.log(await DbMsgs.readDB())
// console.log(await DbProds.readDB()) 

