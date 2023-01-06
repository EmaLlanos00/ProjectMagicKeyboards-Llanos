import ContFirebase from "../../contenedores/contFirebase.js"

class CartDaoFirebase extends ContFirebase {

    constructor() {
        super('carritos')
    }
}

export default CartDaoFirebase