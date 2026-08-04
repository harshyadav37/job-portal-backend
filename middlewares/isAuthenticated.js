import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        // Accept token from cookie or Authorization header (Bearer)
        let token = null;
        if (req.cookies && req.cookies.token) token = req.cookies.token;
        if (!token && req.headers && req.headers.authorization) {
            const auth = req.headers.authorization;
            if (auth.startsWith("Bearer ")) token = auth.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ message: "Unauthorized access", success: false });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized access", success: false });
        }
        req.id = decoded.userId;
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token", success: false });
    }
};

export default isAuthenticated;