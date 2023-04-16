const jwt = require('jsonwebtoken');

const adminMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if(decoded.auth !== 'admin') {
            return
        }
        next();
    } catch {
        res.send("error");
    }
}

module.exports = adminMiddleware;
