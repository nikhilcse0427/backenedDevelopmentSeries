const asyncHandler = (functn) => async (req, res, next) => {
    try {
      await functn(req, res, next);
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message
      });
    }
  };

export { asyncHandler };
