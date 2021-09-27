const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    login:String,
    pwd:String,
    role: String
})

module.exports = mongoose.model('users',userSchema);