import { randomUUID } from 'crypto'

export function createUser({ id = randomUUID(), username, password }) {
    if (!username) throw new Error(`El campo 'username' es obligatorio`)
    if (!password) throw new Error(`El campo 'password' es obligatorio`)
    return {
        id,
        username,
        password,

    }
}