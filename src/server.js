const express = require('express')
const cors = require('cors')

const errorHandler = require('./middlewares/errorHandler.middleware')

const authRouter = require('./routes/auth.router')
const userRouters = require('./routes/user.router')
const articleRoutes = require('./routes/article.router')

const app = express()
app.use(cors())
app.use(express.json())
app.use(errorHandler)


app.use('/auth', authRouter)
app.use('/users', userRouters)
app.use('/articles', articleRoutes)


app.get('/', (request, response) => {
    console.log('user:', request.user)
    response.json({
        ok: true,
        message: 'BackendMediumApi'
    })
})




module.exports = app
