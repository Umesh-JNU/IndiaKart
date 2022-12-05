const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const express = require("express");
const router = express.Router();

router.post("/order/new", isAuthenticated, newOrder);
router.get("/order/:id", isAuthenticated, getSingleOrder);
router.get("/orders/me", isAuthenticated, myOrders);
router.get(
  "/admin/orders",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllOrders
);
router
  .route("/admin/order/:id")
  .get(isAuthenticated, authorizeRoles("admin"), getSingleOrder)
  .put(isAuthenticated, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteOrder);


module.exports = router;
