function errorHandler(err, req, res, next) {
    const status = err.status || 500
    console.error(`❌ Error: ${err.message}`)
    if (process.env.NODE_ENV !== 'production') {
        console.error(err.stack)
    }
    res.status(status).json({
        error: err.message || 'Error interno del servidor',
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    })
}

export default errorHandler
