
const config = {
    productos: {
        json: {
            path: '../productos.txt'
        },
        mongodb: {
            col: 'productos'
        },
        firebase: {
        }
    },
    carritos: {
        json: {
            path: '../carritos.txt'
        },
        mongodb: {
            col: 'carritos'
        },
        firebase: {
        }
    }
}

export const TIPO_PROD = /* process.env.PERS ?? */ 'mongodb'
export const TIPO_CART = /* process.env.PERS ?? */ 'firebase'

export default config