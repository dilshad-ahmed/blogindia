const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("mongodb is connected");
    }).catch((error) => {
        console.log("mongodb connection error ====>", error);
    })
}

module.exports = connectDB;