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
    data: [],
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

module.exports = {
  updateCartWithValidItems,
  createEmptyCartAndResponse,
  paginateCartItems,
};