const userModel = require('../models/userModal');
const asyncMiddleware = require('../middleware/asyncMiddleware');
const errorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtTokens');

// register user
exports.registerUser = asyncMiddleware(async (req, res, next) => {
    const {name, email, password} = req.body;

    const user = await userModel.create({
        name, email, password,
        avatar: {
            public_id: "this is a sample id",
            url: "profileURL"
        },
    })

    sendToken(user, 201, res);
})

// login user
exports.loginUser = asyncMiddleware(async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password) 
        return next(new errorHandler("Please enter your email and password", 400));

    const user = await userModel.findOne({email}).select("+password");

    if(!user) {
        return next(new errorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = user.comparePassword(password);

    if(!isPasswordMatched) return next(new errorHandler("Invalid email or password!", 401));

    sendToken(user, 200, res);
});

// logout
exports.logoutUser = asyncMiddleware(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: false,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});