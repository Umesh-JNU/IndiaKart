const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview } = require("../controllers/productController")
const { isAuthenticated, authorizeRoles } = require("../middleware/auth")

const express = require('express')
const router = express.Router()

router.route("/products").get(getAllProducts)
router.route("/admin/products/new").post(isAuthenticated, authorizeRoles("admin"), createProduct)
router.route("/admin/products/:id")
    .put(isAuthenticated, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct)
    .get(getProductDetails)

router.route("/product/:id").get(getProductDetails)

router.route("/review").put(isAuthenticated, createProductReview)
router.route("/reviews").get(getProductReviews).delete(isAuthenticated, deleteReview)

module.exports = router