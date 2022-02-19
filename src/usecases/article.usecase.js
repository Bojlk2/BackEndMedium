const createError = require('http-errors')
const Article = require('../models/article.model')

function getAll() {
   return Article.find()

}

function getById (id) {
    return Article.findById(id)
}

function create (articleData) {
    const newArticle = new Koder(articleData)

const errors = newArticle.validateSync()
if(errors){
    console.log('errors:', errors)
    throw new createError(400, ' validation failed')
}

  return  newArticle.save()
}

function deleteById (id)
{
    return Article.findByIdAndDelete(id)
}

function updateById (id, articleData) {
    return Article.findByIdAndUpdate(id, articleData)
}
module.exports = {
    getAll,
    getById,
    create,
    deleteById,
    updateById
}