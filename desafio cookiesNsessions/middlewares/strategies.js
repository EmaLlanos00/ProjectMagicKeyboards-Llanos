import { Strategy } from "passport-local";
import { registrarUser, autenticarUser } from "../validaciones/validarUser.js";


export const localRegister = new Strategy({
    passReqToCallback: true,

},

    async (req, username, password, done) => {
        try {

            const usuario = await registrarUser(req.body)
            console.log({ usuario: usuario })
            usuario == undefined ? error : done(null, usuario)


        } catch (error) {

            done(null, false, error);
        }
    });

export const localLogin = new Strategy(
    async (username, password, done) => {
        try {
            const usuario = await autenticarUser(username, password);
            done(null, usuario);

        } catch (error) {
            done(null, false, error)
            console.log(error)
        }
    }
)    