import * as strategies from './strategies.js'
import passport from 'passport'
import { obtenerUserPorId } from '../persistenciaMongo/usuarios.js'


passport.use('register', strategies.localRegister)
passport.use('login', strategies.localLogin)

export const passportMiddleware = passport.initialize()

passport.serializeUser((user, done) => {

    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    try {

        const user = obtenerUserPorId(id)
        done(null, user)
    } catch (error) {

        done(error)
    }
})


export const passportSessionHandler = passport.session()