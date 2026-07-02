const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {

        // Get Authorization Header
        const authHeader = req.headers.authorization;

        // Check if token exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Access Denied. No Token Provided."
            });
        }

        // Extract Token
        const token = authHeader.split(" ")[1];

        // Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Save User ID in Request
        req.user = decoded;

        // Continue
        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or Expired Token"
        });

    }
};

module.exports = authMiddleware;