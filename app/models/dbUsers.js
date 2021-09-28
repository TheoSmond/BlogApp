const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    login: { type: String, unique: true },
    pwd: { type: String },
    role: { type: String }
})

module.exports = mongoose.model('users',userSchema);