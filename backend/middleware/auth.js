const ErrorHandler = require("../utils/errorHandler");
const asyncMiddleware = require("./asyncMiddleware");
const jwt = require('jsonwebtoken');
const userModal = require("../models/userModal");

exports.isAuthenticated = asyncMiddleware(async (req, res, next) => {
    const {token} = req.cookies;

    if(!token) {
        return next(new ErrorHandler("Please login to access this resource.", 401));
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await userModal.findById(decodeData.id); 

    next();
})

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to this resource.`, 401));
        }
        next();
    };

}