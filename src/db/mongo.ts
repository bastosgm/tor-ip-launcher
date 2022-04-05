import { connect } from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const mongoConn = async () => {
  try {
    await connect(process.env.MONGO_URL as string)
    console.log("Conectado ao DB com sucesso!")
  } catch (err) {
    console.log("Error: ", err)
  }
}

export default mongoConn
