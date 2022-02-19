const articleModel = require('../models/article.model')
const article = require('../models/article.model')

function getAll() {
    return article.find()
}

function getById(id) {
    return articleModel.findById(id)
}

function create( articleData ) {
    return article.create(articleData)
}

function deleteById( id ) {
    return article.findByIdAndDelete(id)
}
function update(id, articleData) {
    return article.findByIdAndUpdate(id, articleData)
}



module.exports = {
    getAll,
    getById,
    create,
    deleteById,
    update
}