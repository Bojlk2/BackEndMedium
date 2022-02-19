const express = require('express')
const articles = require('../usecases/article.usecase')

const router = express.Router()

router.get('/', async (request, response) => {
    try {
       const allArticles =  await articles.getAll()
       response.json({
           ok: true,
           articles: allArticles
       })
    } catch (error) {
        response.status(error.status || 500)
        response.json({
            ok: false,
            error: error.message || 'unknow'
        })
    }
})

router.post('/', async (request, response) => {
    try {
        const articleCreated = await articles.create(request.body)
        response.json({
            ok: true,
            message: 'Article created'
        })
        
    } catch (error) {
        response.status(error.status || 500)
        response.json({
            ok: false,
            error: error.message || 'unknow'
        })
    }

})

router.delete('/', async (request, response) => {
    try {
        const articleDeleted = await articles.deleteById(request.params.id)
        if (!articleDeleted){
            const error = new Error('Article not found')
            error.status = 404
            throw error
        }

    response.json({
         ok: true,
         articles: articleDeleted
    })
    } catch (error) {
        response.status(error.status || 500)
        response.json({
            ok: false,
            error: error.message || 'unknow'
        })
    }


})

router.get('/:id', async(request,response) => {
    try {
        
        const articleFound = await articles.getById(request.params.id)
        if (!articleFound){
            const error = new Error('Article not found')
            error.status = 404
            throw error
        }
        response.json({
            ok: true,
            article: articleFound
        })
    } catch (error) { 
        response.status(error.status || 500)
        response.json({
            ok: false,
            error: error.message || 'unknow'
        })
    
        
    }
})

router.patch('/:id', async( request, response ) => {
    try{
        const id = request.params.id
        const newArticleData = request.body
        const articleUpdate = await articles.update(id, newArticleData ) 

        if( !articleUpdate ) {
            const error = new Error('Article not found')
            error.status = 404
            throw error
        }
        response.json({
            ok : true,
            article : articleUpdate
        })
    } catch (error) {
        response.status( error.status || 500 )
        response.json({
            ok: false,
            error : error.message
        })
    }
})

module.exports = router