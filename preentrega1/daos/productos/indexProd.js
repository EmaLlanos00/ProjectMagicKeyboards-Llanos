import config, { TIPO_PROD } from '../../config.js'

let prodDao

switch (TIPO_PROD) {
    case 'json':
        const { default: ProductosDaoJson } = await import('./prodJsonDao.js')
        prodDao = new ProductosDaoJson(config.productos.json.path)
        break
    case 'firebase':
        const { default: ProductosDaoFirebase } = await import('./prodFirebaseDao.js')
        prodDao = new ProductosDaoFirebase()
        break
    case 'mongodb':
        const { default: ProductosDaoMongoDb } = await import('./prodMongoDao.js')
        prodDao = new ProductosDaoMongoDb(config.productos.mongodb.col)
        break
    default:
        const { default: ProductosDaoMem } = await import('')
        prodDao = new ProductosDaoMem()
        break
}

export { prodDao }