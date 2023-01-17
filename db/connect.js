const mongoose = require('mongoose');
mongoose.set('strictQuery', false)

const connectDB = async(url)=>{
    await mongoose.connect(url, { useNewUrlParser: true });
    console.log("SUCCESSFULLY CONNECTED TO THE DATABASE")
}

module.exports = connectDB;