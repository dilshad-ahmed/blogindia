const Users = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const sendJwtToken = require('../utils/sendToken');

// Registration user

exports.registration = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email, !password) {
        return (next(new ErrorHandler(500, "plase enter all the field")))
    }
    const user = await Users.create({ name, email, password, avatar: { public_id: "public-id", url: "avatr url" } })

    sendJwtToken(user, res, 200);


})

//login User 
exports.login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler(500, "please enter email and password"))
    }

    const user = await Users.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler(500, "User not Found"))
    }

    const isAuthenticated = await user.isPasswordMatch(password);

    if (!isAuthenticated) {
        return next(new ErrorHandler(500, "password not match"))
    }


    sendJwtToken(user, res, 200);

})

//logout 

exports.logout = catchAsyncError(async (req, res, next) => {
    res.status(200).cookie("token", null, { expires: new Date() }).json({
        success: true,
        message: "successfully logout"
    })
})

//getAllUser --admin

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await Users.find();

    res.status(200).json({
        success: true,
        users
    })
})