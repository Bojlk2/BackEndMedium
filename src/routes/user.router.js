const express = require( 'express' )

const router = express.Router()

const users = require( '../usecases/user.usecase' )


router.get('/', async( request, response ) => {
    try {
        const allUsers = await users.getAll()

        response.json({
            ok : true,
            users : allUsers
        })
    } catch ( error ) {
        response.status(400)
        response.json({
            ok: false,
            error : error.message
        })
    }
})

router.get('/:id', async( request, response ) => {
    try {
        const userFound = await users.getById( request.params.id )
        if (!userFound){
            const error = new Error('User not found')
            error.status = 404
            throw error
        }
        response.json({
            ok: true,
            user: userFound
        })
    } catch ( error ) {
        response.status(error.status || 500)
        response.json({
            ok: false,
            error : error.message
        })
    }
})

router.post('/', async( request, response ) => {
    try {
        const userCreated = await users.create( request.body )
        
        response.json({
            ok: true,
            user: userCreated
        })
    } catch (error) {
        response.status(500)
        response.json({
            ok: false,
            error : error.message
        })
    }
}) 

router.delete('/', async( request, response) => {
    try {
        const userDeleted = await users.deleteById( request.params.id )

        if (!userDeleted){
            const error = new Error('User not found')
            error.status = 404
            throw error
        }

        response.json({
            ok: true,
            users: userDeleted
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
        const newUserData = request.body
        const userUpdate = await users.update(id, newUserData ) 

        if( !userUpdate ) {
            const error = new Error('User not found')
            error.status = 404
            throw error
        }
        response.json({
            ok : true,
            user : userUpdate
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