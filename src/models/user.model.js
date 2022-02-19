const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        match: /^.*@.*\..*$/,
        require : true
    },
    password : {
        type : String,
        require : true,
        minlength : 1
    },
    name : {
        type : String,
        require : true,
        minlength : 5
    }
})

module.exports = mongoose.model('user', userSchema)