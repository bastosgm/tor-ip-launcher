//1 - o type do model, mesma estrutura
//2 - schema que especifica cada item: name: string, age: number etc.
//3- o proprio model

import { Schema, model, Model, connection } from 'mongoose'

//type
interface Iip {
  ip: string
}

//schema - so aceita esses ou menos
const schema = new Schema<Iip>({
  ip: String
})

//model - nome desse model aqui
//facilita autocomplete quando chamado em outros lugares
const modelName: string = 'Ip'

// export default model<UserType>(modelName, schema)

//Esse metodo evita de ficar recriando o que já existe
//se tem uma conexao e tem um model criado dentro da conexao, retorna ele
//senão, cria esse model
export default (connection && connection.models[modelName]) ?
  //tem que tipar com a classe Model (M maiusculo)
  connection.models[modelName] as Model<Iip>
  :
  model<Iip>(modelName, schema)
