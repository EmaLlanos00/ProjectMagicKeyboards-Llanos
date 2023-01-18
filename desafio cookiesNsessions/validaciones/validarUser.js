import { createUser } from "../models/createUser.js"
import { obtenerUserPorNombre, asegurarNombreUnico, guardarUsuario } from "../persistenciaMongo/usuarios.js"


export async function registrarUser(userData) {
    let itsok = await asegurarNombreUnico(userData.username)
    if (itsok == false) {
        return undefined
    } else {

        const auxUser = createUser(userData)
        guardarUsuario(auxUser)
        return auxUser
    }
}

export async function autenticarUser(username, password) {

    let usuario
    try {
        let aux = await obtenerUserPorNombre(username).then(res => usuario = res)
        console.log({ auxis: aux })

    } catch (error) {

        throw new Error('error de autenticación')
    }

    if (usuario.password !== password) {

        throw new Error('error de autenticación: contraseña incorrecta')
    }
    return usuario
}