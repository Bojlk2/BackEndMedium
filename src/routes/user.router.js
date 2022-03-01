const express = require('express')
const createError = require('http-errors')
const router = express.Router()
const users = require('../usecases/user.usecase')
const auth = require('../middlewares/auth.middleware')

//router.use(auth)

router.get('/', auth, async(request, response) => {
    try {
        const allUsers = await users.getAll()
        response.json({
            ok: true,
            users: allUsers
        })
    } catch (error) {
        response.status(error.status || 500)
        response.json({
            ok: false,
            error: ErrorEvent.messages || 'Desconocido'
        })
    }
})

router.post('/', async(request, response) => {
    try {
        const userCreated = await users.create(request.body)
        response.json({
            ok: true,
            users: userCreated
        })
    } catch (error) {
        response.status(error.status || 500)
        response.json({
            ok: false,
            error: ErrorEvent.messages || 'Desconocido'
        })
    }
})

router.delete('/:id', auth, async(request, response) => {
    try {
        const userDeleted = await users.deleteById(request.params.id)
        if(!userDeleted) throw new createError(404, 'Usuario no encontrado')
        response.json({
            ok: true,
            users: userDeleted
        })
    } catch (error) {
        response.status(error.status || 500)
        response.json({
            ok: false,
            error: ErrorEvent.messages || 'Desconocido'
        })
    }
})

router.get('/:id', auth, async(request, response) => {
    try {
        const userFound = await users.getById(request.params.id)
        if(!userFound) throw new createError(404, 'Usuario no encontrado')
        response.json({
            ok: true,
            users: userFound
        })
    } catch (error) {
        response.status(error.status || 500)
        response.json({
            ok: false,
            error: ErrorEvent.messages || 'Desconocido'
        })
    }
})

module.exports = router