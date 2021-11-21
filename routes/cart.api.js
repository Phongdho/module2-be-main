const express = require("express");
const {
  createCart,
  addProductToCart,
  removeProductFromCart,
  getSingleCart,
  payCart,
  deleteCart,
  getAll,
  getAllOwn,
} = require("../controllers/cart.controller");

const authenticationMiddleware = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/isAdmin.middleware");
const router = express.Router();

/**
 * Description: create cart
 * Access : authenticated user
 */
router.post("/:productId", authenticationMiddleware, createCart);

/**
 * Description: add product to cart
 * Access : authenticated user
 */
router.put("/add-product-cart", authenticationMiddleware, addProductToCart);

/**
 * Description: Update product
 * Access : admin role required
 */
router.delete(
  "/remove-product-cart/:cartId",
  authenticationMiddleware,
  removeProductFromCart
);
 
/**
 * Description: Delete cart
 * Access : authenticated user
 */
router.delete("/:cartId", authenticationMiddleware, deleteCart);

/**
 * Description: get single cart
 * Access : admin
 */
router.get("/single-cart", authenticationMiddleware, getSingleCart);

/**
 * Description: Get all carts
 * Access : admin role required
 */
router.get("/", authenticationMiddleware, isAdmin, getAll);

/**
 * Description: Get all own cart
 * Access : authenticated user
 */
router.get("/me", authenticationMiddleware, getAllOwn);

/**
 * Description: Pay cart
 * Access : authenticated user
 */
router.put("/payment/:cartId", authenticationMiddleware, payCart);
module.exports = router;
