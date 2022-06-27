const errorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Serval Error";

    if(err.name === "CastError") {
        const msg = `Resource not found. Invalid: ${err.path}`;
        err = new errorHandler(msg, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
}