/**
 * Wrapper for async route handlers
 * Automatically catches errors and passes them to error middleware
 * 
 * Usage:
 * const myController = catchAsync(async (req, res, next) => {
 *   // Your async code here
 *   // No need for try-catch blocks
 * });
 */
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

module.exports = catchAsync;
