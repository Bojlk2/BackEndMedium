const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const createError  = require('http-errors')
const jwt = require('../lib/jwt.lib')

async function create (userData) {
    const userFound = await User.findOne({email: userData.email})
    if(userFound) throw new createError(412, 'El usuario ya existe')
    
    const hash = await bcrypt.hash(userData.password, 10)
    userData.password = hash
    return User.create(userData)
}

async function login (email, password) {
    const userFound = await User.findOne({email})
    if (!userFound) throw new createError(401, 'Datos Inválidos')

    const isValidPAssword = await bcrypt.compare(password, userFound.password)
    if(!isValidPAssword) throw new createError(401, 'Datos Inválidos')

    return jwt.sign({id: userFound._id})
}

function deleteById(id) {
    return User.findByIdAndDelete(id)
}

function getAll() {
    return User.find()
}

function getById(id) {
    return User.findById(id)
}

module.exports = {
    create,
    login,
    deleteById,
    getAll,
    getById
}