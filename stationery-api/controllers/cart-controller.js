const Cart = require("../models/Cart");
const { findUserById } = require("../utils/shared-utils");
const { createEmptyCartAndResponse, paginateCartItems } = require("../services/cart-service");

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

    res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
}

module.exports = { getUserCart };