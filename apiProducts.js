module.exports = class ApiProducts {
    constructor() {
        this.products = [{
            title: "keyboard yellow",
            price: 75000,
            thumbnail: "https://i.ibb.co/VVMxyyf/jri165-teclado-yellow.jpg",
            id: 1
        },
        {
            title: "keyboard navy black",
            price: 73500,
            thumbnail: "https://i.ibb.co/qg8sd4Q/jri165-teclado-navy-black.jpg",
            id: 2
        },
        {
            title: "keyboard maroon black",
            price: 69000,
            thumbnail: "https://i.ibb.co/R6DRq2N/jri165-teclado-maroon-black.jpg",
            id: 3
        },
        {
            title: "switches ktt mint x10u",
            price: 1500,
            thumbnail: "https://i.ibb.co/ZGkNppw/ktt-mint-10u.jpg",
            id: 4
        }
        ];
        this.id = 0
    }

    getById(number) {
        let element = this.products.find(item => item.id === parseInt(number));
        return element == undefined ? { error: "no such element" } : element
    }

    getAll() {
        return [...this.products]
    }

    addNewProd(object) {
        object.id = this.products.length + 1;
        this.products.push(object);
        return object;
    }

    modifyById(newId, newObj) {
        newObj.id = parseInt(newId);
        if (newId <= this.products.length) {
            this.products.splice(newId - 1, 1, newObj);
            return newObj
        } else {
            return { error: "elemento no encontrado" }
        }

    }

    deleteById(id) {
        let spliceTrash = this.products.splice(id - 1, 1)
        return spliceTrash.length > 0 ? this.products : { error: "elemento no encontrado" }
    }

}
