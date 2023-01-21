import { calculoDificil } from "./utils.js"


process.on('message', msg => {
    const answer = calculoDificil(msg)
    process.send(answer)
    process.exit()
})

process.send('listo')