/**
 * Custom Application Error Class
 * Extends the native Error class with additional properties
 * for consistent error handling across the application
 */
class AppError extends Error {
  /**
   * @param {string} message - Error message to display
   * @param {number} statusCode - HTTP status code
   * @param {boolean} isOperational - Whether this is an operational error (default: true)
   */
  constructor(message, statusCode, isOperational = true) {
    super(message);
    
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = isOperational;
    
    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
