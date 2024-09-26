import express, {urlencoded } from 'express'
import cors from 'cors'

import client from './src/common/db.js'
import routes from './src/pelicula/routes.js'
import routesact from './src/actor/routes.js'

const PORTS = 3000 || 3001
const app = express()

app.use(express.json())
app.use(urlencoded({extended: true }))
app.use(cors())

app.all('/', (req, res) => {return res.status(200).send('Bienvenido al cine Iplacex')})

app.use('/api', routesact)

await client.connect().then(() =>{

console.log('conectado al cluster')

app.listen(PORTS, ()=> { console.log('Servidor corriendo en Http://localhost:${PORTS}') })

}).catch(() =>{


    console.log("Ha ocurrido un error al conectar al cluster de atlas")

})