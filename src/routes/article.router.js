const express = require('express')

const articles = require('../usecases/article.usercase')

const router = express.Router()

router.get('/', async( request, response) => {
    try {
        const allArticles = await articles.getAll()

        response.json({
            ok: true,
            articles: allArticles
        })
    } catch (error) {
        response.status(400)
        response.json({
            ok: false,
            error : error.message
        })
    }
})

router.get('/:id', async( request, response) => {
    try {
        const articleFound = await articles.getById( request.params.id)

        if (!articleFound){
            const error = new Error('Article not found')
            error.status = 404
            throw error
        }
        response.json({
            ok: true,
            articles: articleFound
        })
    } catch (error) {
        response.status(error.status || 500)
        response.json({
            ok: false,
            error : error.message
        })
    }
})

router.post('/', async( request, response ) => {
    try { 
        const newArticleData = request.body
        const articleCreate = await articles.create( newArticleData )

        response.json({
            ok: true,
            message : 'Articulo creado',
            article: articleCreate
        })
    } catch (error) {
        response.status(500)
        response.json({
            ok: false,
            error : error.message
        })
    }
})

router.delete('/:id', async( request, response) => {
    try {
        const mentorDeleted = await articles.deleteById( request.params.id )

        if (!mentorDeleted){
            const error = new Error('Article not found')
            error.status = 404
            throw error
        }

        response.json({
            ok: true,
            articles: mentorDeleted
        })
    } catch (error) {
        response.status(error.status || 500)
        response.json({
            ok: false,
            error : error.message
        })
    }
})

router.patch('/:id', async( request, response ) => {
    try{
        const id = request.params.id
        const newArticleData = request.body
        const articleUpdate = await articles.update(id, newArticleData)

        if( !articleUpdate ) {
            const error = new Error('Article not found')
            error.status = 404
            throw error
        }
        response.json({
            ok:true,
            article: articleUpdate
        })
    } catch (error) {
        response.status(error.status || 500)
        response.json({
            ok: false,
            error : error.message
        })
    }
})
module.exports = router