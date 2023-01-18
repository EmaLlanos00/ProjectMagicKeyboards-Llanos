import { Router } from "express";
import passport from "passport";
import { obtenerUsuarios } from "../persistenciaMongo/usuarios.js";

export const usuariosRouter = Router()

let userBody
let errorName
let errorPass
usuariosRouter.get('/', (req, res) => {

    let userLog
    if (userBody !== undefined) {
        userLog = true
    } else {
        userLog = false
    }
    res.render('pages/indexnew', {
        userLog: userLog,
        name: userBody,
        errorName: errorName,
        errorPass: errorPass
    })
})

usuariosRouter.get('/newlogin', (req, res) => {

    res.render('pages/indexlogin', {
        errorPass: errorPass
    })
})
export const authRouter = Router()


//registro
authRouter.post('/register', passport.authenticate('register', { failureRedirect: '/auth/failRegister' }), (req, res) => {
    userBody = req.user.username
    errorPass = false
    errorName = false
    res.redirect('/api/usuarios/')
    // res.json(req.user)

})
authRouter.get('/failRegister', (req, res) => {
    errorPass = false
    errorName = true
    res.redirect('/api/usuarios/')
    //res.status(400).json({ err: 'fallo el registro' })
})

//login
authRouter.post('/login', passport.authenticate('login', { failureRedirect: '/auth/failLogin' }), (req, res) => {
    userBody = req.user.username
    res.redirect('/api/usuarios/')
})
authRouter.get('/failLogin', (req, res) => {
    errorPass = true
    errorName = false
    res.redirect('/api/usuarios/newLogin')
    //res.status(401).json({ err: 'fallo el login' })
})




authRouter.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        userBody = undefined
        res.redirect('/api/usuarios');
    });
});
//logout
/* authRouter.post('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            res.send('Han error has ocurred')
        } else {
            res.redirect('/api/usuarios/')
        }
    })

    if (req.isAuthenticated()) {
        req.logout(err => {
            if (err) {
                console.log('hola12')
                res.sendStatus(200)
            } else {
                console.log('hola13')
                res.redirect('/api/usuarios/')
            }
        })
    } else {
        console.log('hola28')
        res.redirect('/api/usuarios/')
    }
}) */