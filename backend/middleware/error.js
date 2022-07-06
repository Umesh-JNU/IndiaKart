const errorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Serval Error";

    if(err.name === "CastError") {
        const msg = `Resource not found. Invalid: ${err.path}`;
        err = new errorHandler(msg, 400);
    }

    // mongoose duplicate key error
    if(err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new errorHandler(message, 400);
    }

    // wrong jwt error 
    if(err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, try again`;
        err = new errorHandler(message, 400);
    }

    // JWT expire error
    if(err.name === "TokenExpiredError") {
        const message = `Json Web Token is expired, try again`;
        err = new errorHandler(message, 400);
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
}