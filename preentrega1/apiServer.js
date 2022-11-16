const fs = require('fs')

module.exports = class ItemContainer {
    constructor(fileroute) {

        this.fileroute = fileroute
    }
    //generar todos los métodos necesarios para satisfacer las operaciones

    async getAll() {

        let dataArray = []
        try {
            const rawData = await fs.promises.readFile(this.fileroute, "utf-8")
            if (rawData.length == 0) {
                return dataArray
            } else {
                const data = JSON.stringify(rawData)
                dataArray = JSON.parse(data)
                console.log(dataArray)
                return dataArray
            }

        }
        catch (err) {

            console.log('Error al leer el archivo')
            return null
        }

    }


    async getById(number) {
        let dataArray = []
        try {
            const rawData = await fs.promises.readFile(this.fileroute, "utf-8")
            if (rawData.length == 0) {
                return undefined
            } else {
                //const data = JSON.stringify(rawData)
                dataArray = JSON.parse(rawData)
                let obj = dataArray.find(item => item.id === parseInt(number))

                return obj == undefined ? { error: "item no encontrado" } : obj
            }

        }
        catch (err) {

            console.log('Error al leer el archivo')
            return null
        }

    }
    async addNewItem(object) {
        let dataArray = []
        let newObj
        try {
            const rawData = await fs.promises.readFile(this.fileroute, "utf-8")

            if (rawData.length === 0) {
                newObj = {
                    ...object,
                    timestamp: Date.now(),
                    id: 1
                }
                dataArray.push(newObj)
                fs.writeFileSync(this.fileroute, JSON.stringify(dataArray, null, '\t'))

            } else {

                dataArray = [...JSON.parse(rawData)]
                let newID = ++dataArray.length
                newObj = {
                    ...object,
                    timestamp: Date.now(),
                    id: newID
                }
                dataArray.push(newObj)
                let cleanedArr = dataArray.filter(item => item != null)
                fs.writeFileSync(this.fileroute, JSON.stringify(cleanedArr, null, '\t'))

            }
            console.log(object)
            return newObj
        }
        catch (err) {

            console.log('Error al leer el archivo: ' + err)
            return null
        }
    }

    async modifyById(number, object) {
        let dataArray = []
        try {
            const rawData = await fs.promises.readFile(this.fileroute, "utf-8")
            if (rawData.length == 0) {
                return undefined
            } else {

                dataArray = JSON.parse(rawData)
                dataArray.splice(parseInt(number) - 1, 1, object)
                fs.writeFileSync(this.fileroute, JSON.stringify(dataArray, null, '\t'))
                return object
            }

        }
        catch (err) {

            console.log('Error al leer el archivo: ' + err)
            return null
        }
    }

    async deleteById(number) {
        let dataArray = []
        try {
            const rawData = await fs.promises.readFile(this.fileroute, "utf-8")
            if (rawData.length == 0) {
                return undefined
            } else {
                //const data = JSON.stringify(rawData)
                dataArray = JSON.parse(rawData)
                console.log(dataArray)
                let deletedItem = dataArray.splice(parseInt(number) - 1, 1)
                fs.writeFileSync(this.fileroute, JSON.stringify(dataArray, null, '\t'))
                return dataArray
            }

        }
        catch (err) {

            console.log('Error al leer el archivo: ' + err)
            return null
        }
    }

    // acá abajo: métodos exclusivos de carrito:


}