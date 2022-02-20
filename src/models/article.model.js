const mongoose = require('mongoose')
require('mongoose-type-url')

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    resume: {
        type: String,
        required: true,
        minlength: 20
    },
    urlImage: {
        type: mongoose.SchemaTypes.Url,
        required: true
    },
    author: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    urlImageAuthor: {
        type: mongoose.SchemaTypes.Url,
        required: true
    },
    timetoread: {
        type: Number,
        required: true,
        min: 1
    },
    tag: {
        type: String,
        minlength: 3
    },
    date: {
        type: Date,
        required: true,
        min: '2022-01-01'
    }
})

module.exports = mongoose.model('article', articleSchema)