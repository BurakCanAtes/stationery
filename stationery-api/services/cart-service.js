const Cart = require("../models/Cart");
const { PAGE_SIZE } = require("../config/product-config");
const { createPagination } = require("../utils/shared-utils");

const updateCartWithValidItems = async (cart) => {
  const validItems = cart.items.filter((item) => item.product !== null);

  if (validItems.length !== cart.items.length) {
    cart.items = validItems;
    await cart.save();
  }
}

const createEmptyCartAndResponse = async (userId) => {
  const cart = new Cart({ user: userId, items: [] });
  await cart.save();

  return {
    _id: cart._id,
    page: 1,
    totalPages: 1,
    totalItemsInCart: 0,
    pageSize: PAGE_SIZE,
    data: cart.items,
    createdAt: cart.createdAt,
    updatedAt: cart.updatedAt,
  };
}

const paginateCartItems = (query, cart) => {
  const totalItems = cart.items.length;
  const sortedItems = cart.items.sort((a, b) => b.createdAt - a.createdAt);

  const { skip, pageNumber, totalPages, pageSize, isLastPage } =
    createPagination(query.page, query.limit, totalItems);

  const paginatedItems = sortedItems.slice(skip, skip + pageSize);

  return {
    _id: cart._id,
    page: pageNumber,
    totalPages,
    totalItemsInCart: totalItems,
    pageSize,
    isLastPage,
    data: paginatedItems,
    createdAt: cart.createdAt,
    updatedAt: cart.updatedAt,
  };
} 

const createCartAndAddProduct = async (userId, product, query) => {
  const cart = new Cart({ user: userId, items: [product] });
  await cart.save();

  return paginateCartItems(query, cart);
};

const updateCartItems = async (cart, newItem, query, userId) => {
  const { product, quantity = 1 } = newItem;

  const wasCartEmpty = cart.items.length === 0;
  const updatedCart = cart.items;
  const cartItemIndex = updatedCart.findIndex(
    (item) => item.product._id.toString() === product
  );

  let updatedItem = null;

  if (cartItemIndex > -1) {
    // If product exists, update quantity
    updatedCart[cartItemIndex].quantity = quantity;
    updatedCart[cartItemIndex].updatedAt = Date.now();
    updatedItem = updatedCart[cartItemIndex];

    // If new quantity is 0, remove the product from the cart
    if (quantity === 0) {
      updatedCart.splice(cartItemIndex, 1);
      updatedItem = null;
    }
  } else {
    // If product does not exist and quantity > 0, add it to cart
    if (quantity > 0) {
      updatedCart.push({ product, quantity });
      updatedItem = updatedCart[updatedCart.length - 1];
    }
  }

  cart.items = updatedCart;
  await cart.save();

  // Re-populate the products if cart was empty before adding the first product
  if (wasCartEmpty) {
    const populatedCart = await Cart.findOne({ user: userId }).populate("items.product");
    const response = paginateCartItems(query, populatedCart);
    const updatedItem = populatedCart.items.length === 1 ? populatedCart.items[0] : null;
    return {
      updatedItem,
      ...response,
    };
  }

  const response = paginateCartItems(query, cart);

  return {
    updatedItem,
    ...response,
  };
};

module.exports = {
  updateCartWithValidItems,
  createEmptyCartAndResponse,
  paginateCartItems,
  createCartAndAddProduct,
  updateCartItems,
};