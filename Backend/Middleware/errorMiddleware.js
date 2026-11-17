const AppError = require('../Utils/AppError');
const {
  handleCastErrorDB,
  handleDuplicateFieldsDB,
  handleValidationErrorDB,
  handleJWTError,
  handleJWTExpiredError,
  handleJoiValidationError,
  handleMulterError
} = require('../Utils/errorHandlers');

/**
 * Send error response in development mode
 * Includes full error details for debugging
 */
const sendErrorDev = (err, req, res) => {
  console.error('ERROR 💥', err);
  
  return res.status(err.statusCode).json({
    success: false,
    error: err,
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode
  });
};

/**
 * Send error response in production mode
 * Hides sensitive error details from clients
 */
const sendErrorProd = (err, req, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }
  
  // Programming or unknown error: don't leak error details
  console.error('ERROR 💥', err);
  
  return res.status(500).json({
    success: false,
    message: 'Something went wrong. Please try again later.'
  });
};

/**
 * Global Error Handling Middleware
 * Catches all errors and sends appropriate responses
 */
const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  // Get environment from environment variables
  const environment = process.env.NODE_ENV || 'development';
  
  if (environment === 'development') {
    sendErrorDev(err, req, res);
  } else if (environment === 'production') {
    let error = { ...err };
    error.message = err.message;
    
    // Handle specific error types
    
    // MongoDB CastError (Invalid ObjectId)
    if (err.name === 'CastError') {
      error = handleCastErrorDB(error);
    }
    
    // MongoDB Duplicate Key Error
    if (err.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }
    
    // MongoDB Validation Error
    if (err.name === 'ValidationError') {
      error = handleValidationErrorDB(error);
    }
    
    // JWT Invalid Token Error
    if (err.name === 'JsonWebTokenError') {
      error = handleJWTError();
    }
    
    // JWT Expired Token Error
    if (err.name === 'TokenExpiredError') {
      error = handleJWTExpiredError();
    }
    
    // Joi Validation Error
    if (err.isJoi === true || err.name === 'ValidationError' && err.details) {
      error = handleJoiValidationError(err);
    }
    
    // Multer File Upload Error
    if (err.name === 'MulterError') {
      error = handleMulterError(err);
    }
    
    sendErrorProd(error, req, res);
  }
};

/**
 * Catch-all handler for undefined routes (404)
 */
const notFoundHandler = (req, res, next) => {
  const error = new AppError(
    `Cannot find ${req.originalUrl} on this server`,
    404
  );
  next(error);
};

/**
 * Wrapper for async route handlers
 * Automatically catches errors and passes them to error middleware
 */
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

module.exports = {
  globalErrorHandler,
  notFoundHandler,
  catchAsync
};
