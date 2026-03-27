import jwt from "jsonwebtoken";

export function authenticateUser(req, res, next) {
    try {
        let token = req.cookies.token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error("Error authenticating user:", error);
        res.status(401).json({ message: "Invalid or expired token" });
    }
}