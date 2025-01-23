// require('dotenv').config({path: './env'})

import dotenv from 'dotenv'
import mongoose from 'mongoose'
import {app} from './app.js'
import connectDB from './db/index.js'
dotenv.config({
  path: './.env'
})


connectDB()
.then(()=>{
  app.listen(`${process.env.PORT}` || 5000)
  console.log(`app is running on port number ${process.env.PORT}`)
})
.catch(()=>{
  console.log("Mongodb not connectted successfully")
})













// (async()=>{
//   try{
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//     app.on("error",(error)=>{
//       console.error("Error: ",error)
//       throw error
//     })

//     app.listen(process.env.PORT,()=>{
//       console.log(`app is running on port number: ${process.env.PORT}`)
//     })
//   }
//   catch(error){
//     console.error("Error: ",error)
//     throw error
//   }
// })()