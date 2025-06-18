const Cart = require("../models/Cart");
const { findUserById } = require("../utils/shared-utils");
const { createEmptyCartAndResponse, paginateCartItems, createCartAndAddProduct, updateCartItems } = require("../services/cart-service");
const { filterFields } = require("../utils/validation");
const { cartItemFields } = require("../config/requests-config");
const { createValidationError } = require("../utils/errors");
const { throwInvalidCartProduct } = require("../utils/cart-utils");

const getUserCart = async (req, res, next) => {
  try {
    const { userId } = req;

    // Check if user exist
    const user = await findUserById(userId);
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if(user && !cart) {
      const response = await createEmptyCartAndResponse(userId);
      return res.status(200).json(response);
    }

    const response = paginateCartItems(req.query, cart);

    const totalItemsInCart = cart.items.reduce((acc, item) => acc + item.quantity, 0);

    res.status(200).json({...response, totalItemsInCart});
  } catch (error) {
    return next(error);
  }
}

const updateCart = async (req, res, next) => {
  try {
    const { userId } = req;

    throwInvalidCartProduct(req.body);

    const user = await findUserById(userId);
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    const { set } = filterFields(req.body, cartItemFields);

    if (user && !cart) {
      const response = await createCartAndAddProduct(userId, set, req.query);
      return res.status(200).json(response);
    }

    const response = await updateCartItems(cart, set, req.query, userId);

    res.status(200).json(response);
  } catch (error) {
    const validationError = createValidationError(error);
    return next(validationError || error);
  }
}

const clearCart = async (req, res, next) => {
  try {
    const { userId } = req;
    // throws error if user does not exist
    await findUserById(userId);

    await Cart.deleteOne({ user: userId });

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    return next(error);
  }
}

module.exports = { getUserCart, updateCart, clearCart };