const argon2 = require("argon2");
const zxcvbn = require("zxcvbn");

const User = require("../models/User");

const validatePassword = (pwd) => {
  const result = zxcvbn(pwd);
  const PWD_VALID_SCORE = 3;

  if (result.score < PWD_VALID_SCORE) {
    // TODO: handle error
    throw Error("Weak password");
  }
};

const hashPassword = async (userData) => {
  const user = new User(userData);

  try {
    const hashedPwd = await argon2.hash(user.password, {
      type: argon2.argon2id,
    });
    user.password = hashedPwd;
    return user;
  } catch (error) {
    // TODO: handle error
    throw Error("Failed");
  }
};

const createUser = async (userData) => {
  validatePassword(userData.password);

  try {
    const user = await hashPassword(userData);
    await user.save();

    return user;
  } catch (error) {
    // TODO: handle error
    throw error;
  }
};

module.exports = { createUser };