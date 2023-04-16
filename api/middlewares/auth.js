const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = { _id: decoded.userId };
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "鉴权失败" });
  }
};

module.exports = authMiddleware;