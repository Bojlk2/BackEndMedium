const Article = require('../models/article.model')

function create(articleData) {
    return Article.create(articleData)
}

function deleteById(id) {
    return Article.findByIdAndDelete(id)
}

function update(id, newArticleData) {
    return Article.findByIdAndUpdate(id, newArticleData)
}

function getById(id) {
    return Article.findById(id)
}

function getAll() {
    return Article.find()
}

module.exports = {
    create,
    deleteById,
    update,
    getById,
    getAll
}