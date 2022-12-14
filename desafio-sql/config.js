
//config para mysql
const driver = 'mysql'
const user = 'root'
const pass = 'admin'
const host = 'localhost'
const port = 3306
const db = 'backenddata'
const cnxStr = `${driver}://${user}:${pass}@${host}:${port}/${db}`

export const MysqlConfig = {
    client: 'mysql2',
    connection: cnxStr
}

//config para sqlite
export const SqliteConfig = {
    client: 'sqlite3',
    connection: { filename: './Db/mydb.sqlite' }
}