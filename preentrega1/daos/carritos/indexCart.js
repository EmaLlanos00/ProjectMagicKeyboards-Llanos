import config, { TIPO_CART } from '../../config.js'

let cartDao

switch (TIPO_CART) {
    case 'json':
        const { default: CarritoDaoJson } = await import('./cartJsonDao.js')
        cartDao = new CarritoDaoJson(config.carritos.json.path)
        break
    case 'firebase':
        const { default: CarritoDaoFirebase } = await import('./cartFirebaseDao.js')
        cartDao = new CarritoDaoFirebase()
        break
    case 'mongodb':
        const { default: CarritoDaoMongoDb } = await import('./cartMongoDao.js')
        cartDao = new CarritoDaoMongoDb(config.carritos.mongodb.col)
        break
    default:
        const { default: CarritoDaoMem } = await import('')
        cartDao = new CarritoDaoMem()
        break
}

export { cartDao }