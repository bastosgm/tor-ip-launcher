//1 - Schema que especifica a regra de negocio
//2 - O proprio model
import { Schema, model, Model, connection } from 'mongoose'
import { Iip } from '../types/Iip'

//Schema - so aceita esses ou menos
const schema = new Schema<Iip>({
  ip: String
})

//Model - nome desse model aqui
//Facilita autocomplete quando chamado em outros lugares
const modelName: string = 'Ip'

//Esse ternario evita de ficar recriando o que ja existe
//Se tem uma conexao e tem um model criado dentro da conexao, retorna ele
//Senao, cria esse model
export default (connection && connection.models[modelName]) ?
  //Tem que tipar com a classe Model
  connection.models[modelName] as Model<Iip>
  :
  model<Iip>(modelName, schema)
