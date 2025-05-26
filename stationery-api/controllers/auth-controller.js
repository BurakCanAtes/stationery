const { registerFields, loginFields } = require("../config/requests-config");
const User = require("../models/User");
const { createUser, checkUser } = require("../services/auth-service");
const { isInvalidBody, createToken } = require("../utils/auth-utils");
const { findUserById } = require("../utils/shared-utils");

const register = async (req, res) => {
  try {
    if (isInvalidBody(req.body, registerFields)) {
      // TODO: handle errors globally
      console.error("Invalid Body");
      res.status(400).json({ message: "Error" });
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
    // TODO: handle errors
    res.status(500).json({ message: error.message || "Something went wrong!" });
  }
};

const login = async (req, res) => {
  try {
    if (isInvalidBody(req.body, loginFields)) {
      // TODO: handle errors globally
      console.error("Invalid Body");
      res.status(400).json({ message: "Error" });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      // TODO: handle error
      throw Error("Invalid email or password");
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
    // TODO: handle errors
    res.status(500).json({ message: error.message || "Something went wrong!" });
  }
};

const getAuthUser = async (req, res) => {
  try {
    const { userId } = req;

    const user = await findUserById(userId);

    res.status(200).json({
      _id: user._id,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    // TODO: handle errors
    res.status(500).json({ message: error.message || "Something went wrong!" });
  }
};

module.exports = { register, login, getAuthUser };