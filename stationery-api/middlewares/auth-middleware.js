const { decodeToken } = require("../utils/auth-utils");

const verifyUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // TODO: handle error
    res.status(401).json({ message: "Unauthorized access" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = decodeToken(token);
    req.userId = decoded._id;
    next();
  } catch (error) {
    // TODO: handle error
    res.status(500).json({ message: error.message || "Something went wrong!" });
  }
};

module.exports = verifyUser;
