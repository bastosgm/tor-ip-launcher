//1 - Schema que especifica a regra de negocio
//2 - O proprio model
import { Schema, model, Model, connection } from 'mongoose'
import { IExceptions } from '../types/IExceptions'

//Exceptions
const ExceptionsSchema = new Schema<IExceptions>({
  ip: String
}, { collection: 'exceptions' })

//Model - nome desse model aqui
//Facilita autocomplete quando chamado em outros lugares
const modelExceptionName: string = 'Exceptions'

//Esse ternario evita de ficar recriando o que ja existe
//Se tem uma conexao e tem um model criado dentro da conexao, retorna ele
//Senao, cria esse model
export default (connection && connection.models[modelExceptionName]) ?
  //Tem que tipar com a classe Model
  connection.models[modelExceptionName] as Model<IExceptions>
  :
  model<IExceptions>(modelExceptionName, ExceptionsSchema)
