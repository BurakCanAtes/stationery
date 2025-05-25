const { registerFields } = require("../config/requests-config");
const { createUser } = require("../services/auth-service");
const { isInvalidBody, createToken } = require("../utils/auth-utils");

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

module.exports = { register };