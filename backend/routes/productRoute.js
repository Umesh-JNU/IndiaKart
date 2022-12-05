const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productController");
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");

const express = require("express");
const router = express.Router();

router.get("/products", getAllProducts);
router.post(
  "/admin/product/new",
  isAuthenticated,
  authorizeRoles("admin"),
  createProduct
);
router
  .route("/admin/product/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct);
  
router.get("/product/:id", getProductDetails);

router
  .route("/admin/products")
  .get(isAuthenticated, authorizeRoles("admin"), getAdminProducts);

router.put("/review", isAuthenticated, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticated, deleteReview);

module.exports = router;
