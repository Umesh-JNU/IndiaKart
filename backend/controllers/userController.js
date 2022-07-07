const userModel = require('../models/userModal');
const asyncMiddleware = require('../middleware/asyncMiddleware');
const errorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtTokens');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

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

// forget password
exports.forgotPassword = asyncMiddleware(async (req, res, next) => {
    const user = await userModel.findOne({email: req.body.email});

    if(!user) {
        return next(new errorHandler("User not found", 404));
    }

    // get resetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it`;

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully.`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false});

        return next(new errorHandler(error.message, 500));
    }
}) 

// Reset password
exports.resetPassword = asyncMiddleware(async (req, res, next) => {
    // creating hash token
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await userModel.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if(!user) {
        return next(new errorHandler("Reset password token is invalid or has been expired.", 400));
    }

    if(req.body.password !== req.body.confirmPassword) {
        return next(new errorHandler("Please confirm your password", 400));
    }

    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;

    await user.save({validateBeforeSave: false});

    sendToken(user, 200, res);
})

// get user detail 
exports.getUserDetails = asyncMiddleware(async (req, res, next) => {
    const user = await userModel.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

exports.updatePassword = asyncMiddleware(async (req, res, next) => {
    const user = await userModel.findById(req.user.id).select('+password');

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched) {
        return next(new errorHandler("Old password is incorrect", 400));
    }

    if(req.body.newPassword !== req.body.confirmPassword) {
        return next(new errorHandler("Password does not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
})

exports.updateProfile = asyncMiddleware(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }
    
    const user = await userModel.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

exports.getAllUsers = asyncMiddleware(async (req, res, next) => {
    const users = await userModel.find();

    res.status(200).json({
        success: true,
        users
    })
})

exports.getSingleUser = asyncMiddleware(async (req, res, next) => {
    const user = await userModel.findById(req.params.id);

    if(!user) {
        return next(new errorHandler("User not found", 400));
    }
    res.status(200).json({
        success: true,
        user
    })
})

exports.updateUserRole = asyncMiddleware(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    
    const user = await userModel.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

exports.deleteUser = asyncMiddleware(async (req, res, next) => {
    const user = await userModel.findById(req.params.id);

    if(!user) {
        return next(new errorHandler("User not found", 400));
    }

    await user.remove();

    res.status(200).json({
        success: true
    })
})