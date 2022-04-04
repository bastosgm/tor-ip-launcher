import express, { Request, Response } from 'express'
import dotenv from 'dotenv'

//chamo a funcao sempre que for usar as variáveis no arquivo
dotenv.config()

//nova instância do express
const app = express()

//aqui posso usar urlencoded ou json no postman
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//caso não seja encontrado uma rota acima
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint não encontrado.' })
})

//escuta e exibição da porta
app.listen(process.env.PORT, () => {
  console.log(`Rodando na porta ${process.env.PORT}`)
})
