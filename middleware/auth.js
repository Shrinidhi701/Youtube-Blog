const { validateToken } = require("../services/auth");

// Middleware Functions
const checkForAthenticationCookie = (CookieName) => {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[CookieName];
        if (!tokenCookieValue) return next();

        const UserPayload = validateToken(tokenCookieValue);
        req.user = UserPayload;
        
        return next();
    }
}

// Export
module.exports = {
    checkForAthenticationCookie
}