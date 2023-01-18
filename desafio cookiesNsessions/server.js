import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import { passportMiddleware, passportSessionHandler } from './middlewares/passport.js'
import { usuariosRouter, authRouter } from './routes/routes.js'
const app = express()

//---------------middlewares---------------------------------------
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://emanuelDb:emanuellls@cluster0.zp6igpt.mongodb.net/?retryWrites=true&w=majority'
    }),
    secret: 'bruh',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30000 }
}))
app.use(passportMiddleware)
app.use(passportSessionHandler)

app.use('/cookies', express.static('public'))
app.set('view engine', 'ejs')


app.get('/login', (req, res) => {

    let userLog
    if (req.session.username) {
        userLog = true
    } else {
        userLog = false
    }
    res.render('pages/index', {
        userLog: userLog,
        name: req.session.username
    })
})

app.post('/login', (req, res) => {
    let user = req.body.name
    req.session.username = user
    res.redirect('/login')

})

app.post('/deleting', (req, res) => {
    req.session.destroy(err => {
        if (!err) { res.redirect('/login') }
        else {
            res.send({ status: 'Logout ERROR', body: err })
        }
    })

})


app.use('/api/usuarios', usuariosRouter)
app.use('/auth', authRouter)

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`)
})
server.on('error', error => console.log(`error en el servidor: ${error}`))

/* ejemplo sencillo sin session
    app.post('/ejstest', (req, res) => {
    console.log({ response: req.body.name })
    res.cookie('username', `${req.body.name}`, { maxAge: 30000 })

    res.redirect('/ejstest')

})
app.get('/ejstest', (req, res) => {

    let userLog
    if (req.cookies.username) {
        userLog = true
    } else {
        userLog = false
    }
    res.render('pages/index', {
        userLog: userLog,
        name: req.cookies.username
    })
}) */