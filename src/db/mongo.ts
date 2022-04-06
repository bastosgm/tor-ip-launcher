import { connect } from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const mongoConn = async () => {
  try {
    await connect(process.env.MONGO_URL as string)
    console.log("Successfully connected to DB.")
  } catch (err) {
    console.error("Error: ", err)
  }
}

export default mongoConn
