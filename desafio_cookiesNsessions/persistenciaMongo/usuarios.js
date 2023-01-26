import ContMongo from "./containerMongo.js";

const usuarios = new ContMongo('users')


export function guardarUsuario(usuario) {
    usuarios.addNewItem(usuario)
    return 'usuario guardado'
}

export async function obtenerUsuarios() {
    let allUsers
    await usuarios.getAll().then(res => allUsers = res)
    return allUsers
}

export async function obtenerUserPorNombre(name) {
    let oneUser
    await usuarios.getUser(name).then(res => oneUser = res)

    if (oneUser == undefined) {
        throw new Error('No existe usuario con ese nombre')
    } else {

        return oneUser
    }
}

export async function asegurarNombreUnico(name) {
    let oneUser
    await usuarios.getUser(name).then(res => oneUser = res)

    if (oneUser != undefined) {
        return false
    } else {
        return true
    }
}

export async function obtenerUserPorId(id) {
    let oneUser
    await usuarios.getUserById(id).then(res => oneUser = res)
    if (oneUser = undefined) {
        throw new Error('No existe usuario con ese id')
    } else {
        return oneUser
    }
}
