import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import dotenv from 'dotenv'
import { passportMiddleware, passportSessionHandler } from './middlewares/passport.js'
import { usuariosRouter, authRouter, childProcessRouter, processInfo } from './routes/routes.js'
import { logDefault, logWarn, logError } from './loggers/logger.js'
import compression from 'compression'

const app = express()


dotenv.config({})

//---------------middlewares---------------------------------------
//app.use(compression())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGOURL
    }),
    secret: 'bruh',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30000 }
}))
app.use(passportMiddleware)
app.use(passportSessionHandler)

app.use('/cookies', express.static('public'))
app.use(function (req, res, next) {
    //console.log("A user made a request to the endpoint: " + req.url);
    logDefault.info(`ruta: ${req.url} , method: ${req.method}`)
    next();
})

app.set('view engine', 'ejs')

app.all((req, res) => {
    console.log('holatesteando')
})

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
//-------rutas de desafío process and child---------
app.use('/api/randoms', childProcessRouter)
app.use('/info', processInfo)
app.use('/infoZip', compression(), processInfo)

//-------------------endpoint de desafío Porxy n Nginx 

app.get('/', (req, res) => {
    res.send(`Escuchando con cluster en el PID ${process.pid}`)
})


app.use((req, res, next) => {
    res.status(404).send("Lo sentimos, esa ruta no existe :/");
    //console.error(`Error: endpoint ${req.originalUrl} not found`);
    logDefault.warn(`Ruta inexistente: ${req.originalUrl}`)
    logWarn.warn(`Ruta inexistente: ${req.originalUrl}`)
});

app.use((err, req, res, next) => {
    //console.error(err.stack);
    logError.error(`Ups, ocurrió un error: ${err}`)
    logDefault.error(`Ups, ocurrió un error: ${err}`)
    res.status(500).send("Something went wrong. Please try again later.");
});

//const PORT = 8080
export function startServer(PORT) {

    const server = app.listen(PORT, () => {
        console.log(`Servidor ${process.pid} escuchando en el puerto http://localhost:${PORT}`)
    })


    server.on('error', error => console.log(`error en el servidor: ${error}`))
}
//if (process.argv[2] == 8080) { startServer() }

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