import { Router } from "express";
import passport from "passport";
import { obtenerUsuarios } from "../persistenciaMongo/usuarios.js";
import { processInfoAr } from "../childNprocessStuff/processInfo.js";
import { fork } from 'child_process'
//import { calculoDificil } from "../childNprocessStuff/numbersChild.js";

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

//----------------------router child--------------------------------------------------
export const childProcessRouter = Router()

childProcessRouter.get('/', (req, res) => {

    const coso = req.query.number ?? 10000
    const forked = fork('./childNprocessStuff/numbersChild.js')
    let auxObj
    forked.on('message', msg => {

        if (msg == 'listo') {

            forked.send(coso)

        } else {
            auxObj = msg
            res.send(auxObj)
        }
    })

})


//---------------------router info------------------------

export const processInfo = Router()

processInfo.get('/', (req, res) => {
    const processData = processInfoAr
    //console.log(processData)
    /* res.render('pages/processInfo', {
        processData: processData
    }) */

    res.json({ processData })
})

