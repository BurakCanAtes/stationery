const { registerFields, loginFields } = require("../config/requests-config");
const User = require("../models/User");
const { createUser, checkUser } = require("../services/auth-service");
const { isInvalidBody, createToken } = require("../utils/auth-utils");
const { createError, createValidationError } = require("../utils/errors");
const { findUserById } = require("../utils/shared-utils");

const register = async (req, res, next) => {
  try {
    if (isInvalidBody(req.body, registerFields)) {
      throw createError("Request body is invalid or modified", 400);
    }

    const { firstName, lastName, email, password } = req.body;
    const user = await createUser({ firstName, lastName, email, password });
    const token = createToken({
      _id: user._id,
      role: user.role,
    });
    const userData = user.toObject();
    delete userData.password;

    res.status(201).json({
      jwt: {
        token,
      },
      user: userData,
    });
  } catch (error) {
    const validationError = createValidationError(error);
    return next(validationError || error);
  }
};

const login = async (req, res, next) => {
  try {
    if(isInvalidBody(req.body, loginFields)) {
      throw createError("Request body is invalid or modified", 400);
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw createError("Invalid email or password", 401);
    }

    const token = await checkUser(user, password);

    const userData = user.toObject();
    delete userData.password;

    res.status(200).json({
      jwt: {
        token,
      },
      user: userData,
    });
  } catch (error) {
    return next(error);
  }
};

const getAuthUser = async (req, res, next) => {
  try {
    const { userId } = req;

    const user = await findUserById(userId);

    res.status(200).json({
      _id: user._id,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { register, login, getAuthUser };