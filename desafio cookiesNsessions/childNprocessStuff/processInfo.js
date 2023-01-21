

export const processInfoAr = []

const plataforma = {
    SO_plataforma: process.platform,
}
const processId = {
    Id_de_proceso: process.pid,
}
const nodeVersion = {
    Versión_de_Node: process.version
}
const memory = {
    Uso_de_memoria: process.memoryUsage()
}
const proyectPath = {
    Ruta_de_ejecución: process.execPath
}
const proyectRoute = {
    Ruta_del_proyecto: process.cwd()
}
const entryArg = {
    Argumento_de_entrada: process.argv
}

processInfoAr.push(plataforma)
processInfoAr.push(processId)
processInfoAr.push(nodeVersion)
processInfoAr.push(memory)
processInfoAr.push(proyectPath)
processInfoAr.push(proyectRoute)
processInfoAr.push(entryArg)