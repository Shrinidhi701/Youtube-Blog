const JWT = require('jsonwebtoken');

// Define
const secret = '@dfh$fjhds&%^';

// Function Handlers
const createTokenforUser = (user) => {
    const payload = {
        _id : user._id,
        Email: user.Email,
        ProfileImageURL : user.ProfileImageURL,
        Role: user.Role
    }
    const token = JWT.sign(payload, secret);
    return token;
}

const validateToken = (token) => {
    const payload = JWT.verify(token, secret);
    return payload;
}


// Export
module.exports = {
    createTokenforUser,
    validateToken
}