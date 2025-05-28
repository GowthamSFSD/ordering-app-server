const jwt = require("jsonwebtoken");

module.exports = function optionalAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    const sessionToken = req.headers["x-session-token"];

    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        try {
            const user = jwt.verify(token, process.env.JWT_SECRET);
            req.user = user; // authenticated user
        } catch (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
    } else if (sessionToken) {
        req.guest = { sessionId: sessionToken };
    }
    next();
};
