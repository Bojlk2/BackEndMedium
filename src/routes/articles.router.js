const express = require('express')
const createError = require('http-errors')
const articles = require('../usecases/articles.usecase')
const auth = require('../middlewares/auth.middleware')
const router = express.Router()

router.post('/', auth, async(request, response) => {
    try {
        const articleData = request.body
        const articleCreate = await articles.create(articleData)
        response.json({
            ok: true,
            message: articleCreate
        })
    } catch (error) {
        response.status(error.status || 500)
        response.json({
            ok: false,
            message: error.message 
        })
    }
})

router.delete('/:id', auth, async(request, response) => {
    try {
        const articleDelete = await articles.deleteById(request.params.id)
        if(!articleDelete) throw new createError(404, 'Articulo no encontrado')
        response.json({
            ok: true,
            articles: articleDelete
        })
    } catch (error) {
        response.status(error.status || 500)
        response.json({
            ok: false,
            message: error.message
        })
    }
})

router.patch('/:id', auth, async(request, response) => {
    try {
        const articleUpdate = await articles.update(request.params.id, request.body)
        if(!articleUpdate) throw new createError(404, 'Articulo no encontrado')
        response.json({
            ok: true,
            article: articleUpdate
        })
    } catch (error) {
        response.status(error.status || 500)
        response.json({
            ok: false,
            message: error.message
        })
    }
})

router.get('/', async(request, response) => {
    try {
        const allArticles = await articles.getAll()
        response.json({
            ok: true,
            articles: allArticles
        })
    } catch (error) {
        response.status(error.status || 500)
        response.json({
            ok: false,
            message: error.message
        })
    }
})

router.get('/:id', async(request, response) => {
    try {
        const articleFound = await articles.getById(request.params.id)
        if(!articleFound) throw new createError(404, 'Articulo no encontrado')
        response.json({
            ok: true,
            article: articleFound
        })
    } catch (error) {
        response.status(error.status || 500)
        response.json({
            ok: false,
            message: error.message
        })
    }
})

module.exports = router