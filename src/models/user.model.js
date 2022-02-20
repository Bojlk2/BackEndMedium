const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    password: {
        type: String,
        match: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        required: true,
        minlength: 8,
    }
})

module.exports = mongoose.model('user', userSchema)