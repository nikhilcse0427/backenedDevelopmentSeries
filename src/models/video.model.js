import mongoose from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'
import { JsonWebTokenError } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const videoSchema = new mongoose.Schema({
  videoFile:{
    type: String,//cloudinary file
    required:true
  },
  thumbnail:{
    type: String,//cloudinary file
    required:true
  },
  title:{
    type: Schema.Types.ObjectId,
    ref:"User"
  },
  description:{
    type: String,
    required:true,
  },
  duration:{
    type:Number,
    required:true,
  },
  views:{
    type:Number,
    default:0
  },
  isPublished:{
    type:Boolean,
    required:true,
  }
},{
  Timestamps:true
})

videoSchema.plugins(mongooseAggregatePaginate)
userSchema.pre("save", async function(next){
  if(!this.password.isModified("password")) return next()
  
    this.password = bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
}

export const Video = mongoose.model('Video',videoSchema)