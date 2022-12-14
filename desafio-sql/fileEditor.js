const fs = require('fs')
module.exports = class Contenedor {

    constructor(fileRoute) {

        this.fileRoute = fileRoute
    }
    async addNewItem(object) {
        let dataArray
        let newObj
        try {
            const data = await fs.promises.readFile(this.fileRoute, 'utf-8')
            dataArray = [...JSON.parse(data)]
            let id = ++dataArray.length
            newObj = {
                ...object,
                id: id
            }
            dataArray.push(newObj)
            let cleanArray = dataArray.filter(el => el != null)//Filtro para null misterioso (bug?)
            //fs.writeFileSync(this.fileRoute, JSON.stringify(dataArray))
            fs.writeFileSync(this.fileRoute, JSON.stringify(cleanArray, null, '\t'))
            return newObj
        }
        catch (err) {
            console.log('Error al leer el archivo', err)
            return null
        }
    }

    async getAll() {

        let dataArray = []
        try {
            const rawData = await fs.promises.readFile(this.fileRoute, "utf-8")
            if (rawData.length == 0) {
                return dataArray
            } else {
                const data = JSON.stringify(rawData)
                dataArray = JSON.parse(data)
                return dataArray
            }

        }
        catch (err) {

            console.log('Error al leer el archivo')
            return null
        }

    }
}