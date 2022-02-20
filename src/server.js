const express = require('express')
const cors = require('cors')

const usersRouter = require('./routes/user.router')
const articlesRouter = require('./routes/articles.router')
const authRouter = require('./routes/auth.router')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/users', usersRouter)
app.use('/articles', articlesRouter)
app.use('/auth', authRouter)


module.exports = app
