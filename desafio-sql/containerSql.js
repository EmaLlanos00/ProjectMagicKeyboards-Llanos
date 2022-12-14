import knex from 'knex'
// import knexConfig from './config.js'



export default class ContainerSql {
    constructor(config, table = String) {
        this.knexCli = knex(config)
        this.table = table
    }
    async saveInDB(stuff) {
        return await this.knexCli.insert(stuff).into(this.table)
    }
    async readDB(filter = '') {
        return await this.knexCli.select(filter).from(this.table)
    }
    async updateByID(id, obj) {
        return await this.knexCli.from(this.table).where({ id: id }).update(obj)
    }
    async deleteByID(id) {
        return await this.knexCli.delete().from(this.table).where({ id: id })
    }
}



//update
//await knexCli.from('personas').where({ id: 2 }).update({ name: 'manu' })
//delete
// await knexCli.destroy()