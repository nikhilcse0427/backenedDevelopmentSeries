// import { asyncHandler } from '../utils/asyncHandler.js';
// import {uploadOnCloudinary} from '../utils/cloudinary.js';
// import { ApiError } from '../utils/ApiError.js';
// import cloudinary from 'cloudinary'
// import { ApiResponse } from '../utils/ApiResponse.js';
// import {User} from '../models/user.model.js'
// const registerUser =  asyncHandler(async (req, res) => {
//  //get users details from frontened
//  //validation - not empty
//  //check if user already exists
//  const {userName,email,fullName,password} = req.body
//  if(
//   [fullName,userName,email,password].some((field)=>
//   field?.trim()==="")
//  ){
//     throw new ApiError(409,"All fields are required")
//  }
//  const existedUser = await User.findOne({
//   $or: [{userName},{email}]
//  })
//  if(existedUser){
//   throw new ApiError(409,"User with this email or username already exists")
//  }
//   const avatarLocalPath = req.files?.avatar[0]?.path;
//   const coverImageLocalPath = req.files?.coverImage[0]?.path;

//   const avatar = cloudinary.uploader.upload(avatarLocalPath).then(result=>{
//     console.log(result)
//   })

//   if(!avatarLocalPath){
//     throw new ApiError(400, "Avatar file is required")
//   }

//   // const avatar = await uploadOnCloudinary(avatarLocalPath)
//   const coverImage = await uploadOnCloudinary(coverImageLocalPath)
  

//   if(!avatar){
//     throw new ApiError(400,"avatar is required")
//   }

//   const user = await User.create({
//     userName: userName.toLowerCase(),
//     fullName,
//     email,
//     password,
//     avatar:avatar.url,
//     coverImage:coverImage.url || "",
//   })

//   const createUser = await User.findOne(user._id).select("-password -refreshToken")

//   if(!createUser){
//     throw new ApiError(500,"Something went wrong while register the user")
//   }
//   return res.status(201).json(
//     new ApiResponse(200,createUser,"user registered successfully")
//   )

// });

// export { registerUser };


import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import {User} from '../models/user.model.js'
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'your_cloud_name',
  api_key: 'your_api_key',
  api_secret: 'your_api_secret'
});

const registerUser = asyncHandler(async (req, res) => {
  // Get user details from frontend
  const { userName, email, fullName, password } = req.body;

  // Validation - ensure fields are not empty
  if ([fullName, userName, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user already exists
  const existedUser = await User.findOne({
    $or: [{ userName }, { email }]
  });

  if (existedUser) {
    throw new ApiError(409, "User with this email or username already exists");
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await cloudinary.uploader.upload(avatarLocalPath);
  const coverImage = coverImageLocalPath ? await cloudinary.uploader.upload(coverImageLocalPath) : null;

  if (!avatar) {
    throw new ApiError(400, "Avatar upload failed");
  }

  const user = await User.create({
    userName: userName.toLowerCase(),
    fullName,
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  );
});

export { registerUser };
