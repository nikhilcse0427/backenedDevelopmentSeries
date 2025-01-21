import { asyncHandler } from '../utils/asyncHandler.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import {ApiResponse} from '../utils/ApiResponse.js'
const registerUser =  asyncHandler(async (req, res) => {
 //get users details from frontened
 //validation - not empty
 //check if user already exists
 const {userName,email,fullName,password} = req.body
 if(
  [fullName,userName,email,Password].some((field)=>
  field?.trim()==="")
 ){
    throw new ApiError(400,"All fields are required")
 }
 const existedUser = User.findOne({
  $or: [{userName},{email}]
 })
 if(existedUser){
  throw new ApiError(409,"User with this email or username already exists")
 }
  const avatarLocalPath = req.files?.coverImage[0]?.path
  const coverImageLocalPath = req.files?.avatar[0]?.path

  if(!avatarLocalPath){
    throw new ApiError(400, "Avatar file is required")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)
  
  if(!avatar){
    throw new ApiError(400,"avatar is required")
  }

  const user = await User.create({
    userName: userName.toLowerCase(),
    fullName,
    email,
    password,
    avatar:avatar.url,
    coverImage:coverImage.url || ""
  })

  const createUser = await User.findOne(user._id).select("-password -refreshToken")

  if(!createUser){
    throw new ApiError(500,"Something went wrong while register the user")
  }
  return res.status(201).json(
    new ApiResponse(200,createUser,"user registered successfully")
  )

});

export { registerUser };
