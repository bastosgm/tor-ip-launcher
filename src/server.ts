import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import router from './routes'
import mongoConn from './db/mongo'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from './swagger.json'

//Chamo a funcao sempre que for usar as variaveis no arquivo
dotenv.config()
mongoConn()

//Nova instancia do express
const app = express()
//cors para evitar conflito
app.use(cors())

//Aqui deixo duas opcoes de body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Arquivo de rotas principal
app.use('/api', router)

//Documentação
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

//Caso nao seja encontrado uma rota acima
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint not found.' })
})

//Escuta e exibicao da porta
app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}.`)
})
