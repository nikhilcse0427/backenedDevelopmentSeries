import mongoose from 'mongoose'
import {DB_NAME} from '../constant.js'

const connectDB = async () =>{
  try{
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log(`\n MONGODB CONNECTED !! DB HOST: ${connectionInstance.connection.host}`)
  }catch(error){
    console.log('ERROR: ',error)
    process.exit(1)/**You might use process.exit(1) when a critical error occurs, and you want to stop the process immediately. */

  }
}
export default connectDB
