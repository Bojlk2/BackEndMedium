const mongoose = require('mongoose')
require('mongoose-type-url')

const koderSchema = new mongoose.Schema({
    authorName :{
        type: String,
        minlength: 2,
        maxlength: 20,
        require: true
    },
    title :{
        type: String,
        min: 1,
        require: true
    },
    timetoread :{
        type: Number,
        min: 1,
        max: 60,
        required: true
    },
    urlImageAuthor :{
        urls: [{type: mongoose.SchemaTypes.Url}] //https://www.npmjs.com/package/mongoose-type-url
    },
    urlImage :{
        urls: [{type: mongoose.SchemaTypes.Url}]
    },
    tag :{
        type: String
    },
})


module.exports = mongoose.model( 'koder', koderSchema )





