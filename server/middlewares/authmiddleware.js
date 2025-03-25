import UserModel from "../Models/userModels.js";
import { VerifyToken } from "../Utils/JWTtoken.js";

const authMiddleware =async (req, res, next) => {
    try {
        console.log("Cookies:", req.cookies);
        let token = req.cookies?.token;
        console.log("Token received:", token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
                data: null,
            });
        }

        // 🔥 Remove `s:` prefix if it exists (fixes signed cookie issue)
        if (token.startsWith("s:")) {
            token = token.split(":")[1]; // Extract the actual token
        }

        // Verify the token
        let confirmedToken = VerifyToken(token);
        if (confirmedToken.expired) {
            return res.status(401).json({
                success: false,
                message: "Session expired. Please log in again.",
            });
        } else if (confirmedToken.invalid) {
            return res.status(401).json({
                success: false,
                message: "Invalid token. Authentication failed.",
            });
        }

        // Find user
        const user = await UserModel.findById(confirmedToken.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                data: null,
            });
        }
        console.log("hry",user);

        next()
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: `Server error: ${err.message}`,
            data: null,
        });
    }
}
export default authMiddleware;