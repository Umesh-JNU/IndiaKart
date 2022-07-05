const productModel = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const APIFeatures = require("../utils/apiFeatures");

exports.createProduct = asyncMiddleware(async (req, res, next) => {
    const product = await productModel.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})

exports.getAllProducts = asyncMiddleware(async (req, res, next) => {
    const itemPerPage = 5;
    const productCount = await productModel.countDocuments();

    const apiFeature = new APIFeatures(productModel.find(), req.query)
        .search()
        .filter()
        .pagination(itemPerPage);

    const products = await apiFeature.query;
    res.status(200).json({
        success: true,
        products,
        productCount
    })
})

exports.updateProduct = asyncMiddleware(async (req, res, next) => {
    let product = await productModel.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
})

exports.getProductDetails = asyncMiddleware(async (req, res, next) => {
    let product = await productModel.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        product
    })
})

exports.deleteProduct = asyncMiddleware(async (req, res, next) => {
    let product = await productModel.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product Deleted successfully."
    })
})