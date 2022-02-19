
function errorHandler (request, response, next){
    try {
        next()
    } catch (error) {
        response.status(error.status || 500)
        response.json({
            ok: false,
            error: error.message || 'Unknow'
        })
    }
  }
  module.exports = errorHandler