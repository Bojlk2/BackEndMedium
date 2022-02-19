require ('dotenv').config()
const mongoose = require('mongoose')
const server = require('./src/server')

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME
} = process.env

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`)
    .then(() => {
        
        server.listen(8080, () => {
            console.log('Medium is ready on http://localhost:8080')
        })
    })
    .catch(error => {
        console.error('Error conection: ', error)
    })