const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
  Promise.resolve(requestHandler(req, res, next)).catch((error) => next(error))
  }
}
export { asyncHandler }

// const asyncHandler = (functn) => {
//   return async (req, res, next) => {
//     try {
//       await functn(req, res, next);
//     } catch (error) {
//       res.status(error.statusCode || 500).json({
//         success: false,
//         message: error.message
//       });
//     }
//   };
// };

// export { asyncHandler };
