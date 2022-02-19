const bcrypt = require('bcrypt')
const createError = require('http-errors')

const User = require('../models/user.model')

async function create( userData ) {

    const userFound = await User.findOne({ email: userData.email })
    if (userFound) {
        throw new createError( 412, 'Usuario ya existe' )
    }

    const hash = await bcrypt.hash( userData.password, 10)
    userData.password = hash
    return User.create( userData ) 
}

async function login( email, password ) {
    // Paso 1: verificar que el usuario si existe
    const userFound = await User.findOne( { email: userFound.email })
    if ( !userFound ) {
        throw new createError( 401, 'Informacion no valida' )
    }

    // Paso 2: verificar que sea el password correcto
    const isValidPassword = await bcrypt.compare( password, userFound.password )
    if ( !isValidPassword ) {
        throw new createError( 401, 'Informacion no valida' )
    }

    // Paso 3: Expedir el token
    return jwt.sign({ id: userFound._id })
}

function deleteById( id ) {
    return User.findByIdAndDelete( id )
}

function getAll() {
    return User.find()
}

function getById( id ) {
    return User.findById( id )
}

function update( id, userData ) {
    return User.findByIdAndUpdate( id, userData )
}

module.exports = {
    create,
    login,
    deleteById,
    getAll,
    getById,
    update
}