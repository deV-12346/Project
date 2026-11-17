const AppError = require('./AppError');

/**
 * Handle MongoDB Cast Errors (Invalid ObjectId)
 */
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

/**
 * Handle MongoDB Duplicate Key Errors
 */
const handleDuplicateFieldsDB = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  const message = `Duplicate field value: ${field} = "${value}". Please use another value.`;
  return new AppError(message, 400);
};

/**
 * Handle MongoDB Validation Errors
 */
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

/**
 * Handle JWT Invalid Token Errors
 */
const handleJWTError = () => {
  return new AppError('Invalid token. Please login again.', 401);
};

/**
 * Handle JWT Expired Token Errors
 */
const handleJWTExpiredError = () => {
  return new AppError('Your token has expired. Please login again.', 401);
};

/**
 * Handle Joi Validation Errors
 */
const handleJoiValidationError = (err) => {
  const errors = err.details.map(detail => detail.message);
  const message = `Validation failed: ${errors.join('. ')}`;
  return new AppError(message, 400);
};

/**
 * Handle Multer File Upload Errors
 */
const handleMulterError = (err) => {
  let message = 'File upload error';
  
  if (err.code === 'LIMIT_FILE_SIZE') {
    message = 'File size is too large';
  } else if (err.code === 'LIMIT_FILE_COUNT') {
    message = 'Too many files uploaded';
  } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    message = 'Unexpected file field';
  }
  
  return new AppError(message, 400);
};

module.exports = {
  handleCastErrorDB,
  handleDuplicateFieldsDB,
  handleValidationErrorDB,
  handleJWTError,
  handleJWTExpiredError,
  handleJoiValidationError,
  handleMulterError
};
