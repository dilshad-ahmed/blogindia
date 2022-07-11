const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');

const isAuthenticated = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler(500, "not authenticated please login to browse this page"))
    }
    console.log(token)
    next()
})

module.exports = isAuthenticated;