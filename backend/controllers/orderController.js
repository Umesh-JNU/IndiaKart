const orderModel = require('../models/orderModel');
const productModel = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncMiddleware = require("../middleware/asyncMiddleware");

exports.newOrder = asyncMiddleware(async (req, res, next) => {
    const {shippingInfo, orderItems, paymentInfo, itemPrice, taxPrice, shippingPrice, totalPrice} = req.body;

    const order = await orderModel.create({
        shippingInfo, orderItems, paymentInfo, itemPrice, taxPrice, shippingPrice, totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(201).json({
        success: true,
        order
    });
});

exports.getSingleOrder = asyncMiddleware(async (req, res, next) => {
    const order = await orderModel.findById(req.params.id).populate("user", "name email");

    console.log(order);

    if(!order) {
        return next(new ErrorHandler("Order not found with this id", 404));
    }

    res.status(200).json({
        success: true,
        order
    });
});

exports.myOrders = asyncMiddleware(async (req, res, next) => {
    const orders = await orderModel.find({user: req.user._id});

    res.status(200).json({
        success: true,
        orders
    });
});

exports.getAllOrders = asyncMiddleware(async (req, res, next) => {
    const orders = await orderModel.find();

    let totalAmount = 0;
    orders.forEach( order => { totalAmount += order.totalPrice } );

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });
});

exports.updateOrder = asyncMiddleware(async (req, res, next) => {
    const order = await orderModel.findById(req.params.id);

    if(!order) {
        return next(new ErrorHandler("Order not found with this id", 404));
    }
    
    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("You have already delivered this order", 400));
    }

    order.orderItems.forEach(async (order) => {
        await updateStock(order.product, order.quantity);
    })

    order.orderStatus = req.body.status;
    if(req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }
    
    await order.save({validateBeforeSave: false});

    res.status(200).json({
        success: true
    });
});

async function updateStock(id, quantity) {
    const product = await productModel.findById(id);
    product.stock -= quantity;
    await product.save({validateBeforeSave: false});
}

exports.deleteOrder = asyncMiddleware(async (req, res, next) => {
    const order = await orderModel.findById(req.params.id);

    if(!order) {
        return next(new ErrorHandler("Order not found with this id", 404));
    }

    await order.remove();
    res.status(200).json({
        success: true,
    });
});