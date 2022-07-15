const productModel = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const APIFeatures = require("../utils/apiFeatures");

exports.createProduct = asyncMiddleware(async (req, res, next) => {
    req.body.user = req.user.id;

    const product = await productModel.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})

exports.getAllProducts = asyncMiddleware(async (req, res, next) => {
    // return next(new ErrorHandler("Temp error", 500));
    const itemPerPage = 6;
    const productsCount = await productModel.countDocuments();

    const apiFeature = new APIFeatures(productModel.find(), req.query)
        .search()
        .filter()

    let products = await apiFeature.query;
    let filteredProductsCount = products.length;
    apiFeature.pagination(itemPerPage);
    
    products = await apiFeature.query.clone();
    res.status(200).json({
        success: true,
        products,
        productsCount,
        itemPerPage,
        filteredProductsCount
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

exports.createProductReview = asyncMiddleware(async (req, res, next) => {
    const {rating, comment, productId} = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await productModel.findById(productId);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );

    if(isReviewed) {
        product.reviews.forEach(rev => {
            if(rev.user.toString() === req.user._id.toString()) (rev.rating = rating), (rev.comment = comment);
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    let avg = 0;
    product.reviews.forEach(rev => {
        avg += rev.rating;
    });
    product.ratings = avg / product.reviews.length;

    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success: true
    })
})

exports.getProductReviews = asyncMiddleware(async (req, res, next) => {
    console.log(req.query)
    const product = await productModel.findById(req.query.productId);

    if(!product) {
        return next(new ErrorHandler("Product Not found", 404));
    }

    res.status(200).json({
        success: true, 
        reviews: product.reviews
    })
})

exports.deleteReview = asyncMiddleware(async (req, res, next) => {
    const product = await productModel.findById(req.query.productId);

    if(!product) {
        return next(new ErrorHandler("Product Not found", 404));
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() != req.query.id.toString()
    );

    let avg = 0;
    reviews.forEach(rev => avg += rev.rating);

    const numOfReviews = reviews.length;
    const ratings = avg / numOfReviews;

    await productModel.findByIdAndUpdate(req.query.productId, {
        reviews, ratings, numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true, 
    })
})
