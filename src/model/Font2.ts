//1 - Schema que especifica a regra de negocio
//2 - O proprio model
import { Schema, model, Model, connection } from 'mongoose'
import { IExceptions } from '../types/IExceptions'

//Font2
const Font2Schema = new Schema<IExceptions>({
  ip: String
}, { collection: 'font2' })

//Model - nome desse model aqui
//Facilita autocomplete quando chamado em outros lugares
const modelFont2Name: string = 'Font2'

//Esse ternario evita de ficar recriando o que ja existe
//Se tem uma conexao e tem um model criado dentro da conexao, retorna ele
//Senao, cria esse model
export default (connection && connection.models[modelFont2Name]) ?
  //Tem que tipar com a classe Model
  connection.models[modelFont2Name] as Model<IExceptions>
  :
  model<IExceptions>(modelFont2Name, Font2Schema)
