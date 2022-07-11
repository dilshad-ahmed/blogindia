const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "please Enter your name"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "please enter your email"],
        validate: [validator.isEmail, "please enter valid email "],
        unique: true
    },
    password: {
        type: String,
        required: [true, "please enter password"],
        minlength: [8, "password must be 8 character"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true
        }
    },
    userRole: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

//password hashing
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10);
})

// password check
userSchema.methods.isPasswordMatch = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//jwt token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}



module.exports = mongoose.model("user", userSchema);