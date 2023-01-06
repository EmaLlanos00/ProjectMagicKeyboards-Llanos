import ContMongo from "../../contenedores/contMongo.js"

class ProductosDaoMongo extends ContMongo {

    constructor(col) {
        super(col)
    }
}

export default ProductosDaoMongo