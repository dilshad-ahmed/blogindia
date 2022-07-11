const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "please enter blogs title"],
        maxLength: 30,
    },
    description: {
        type: String,
        required: [true, "please enter blogs description"],
    },
    category: {
        type: String,
        required: [true, "please enter blogs category"],
    },
    tags: [
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
    }

});

module.exports = mongoose.model("blogs", blogSchema)