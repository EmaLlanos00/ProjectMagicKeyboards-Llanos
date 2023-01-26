import { startServer } from './server.js'
import os from 'os'
import cluster from 'cluster'

const cpusQty = os.cpus().length

if (cluster.isPrimary) {
    console.log(`PID primario ${process.pid}`)
    for (let i = 0; i < 4; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`)
        cluster.fork()
    })
} else {
    startServer(8088)
}

