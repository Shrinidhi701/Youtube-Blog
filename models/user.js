const { createHmac, randomBytes } = require('crypto');
const { Schema, model } = require('mongoose');
const { createTokenforUser } = require('../services/auth');

// User Schema
const userSchema = new Schema({
    FullName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Salt: {
        type: String
    },
    ProfileImageURL: {
        type: String,
        default: '/images/default.png'
    },
    Role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER'
    }
});

// Insert Check
userSchema.pre('save', function (next) {
    const User = this;

    if(!User.isModified('Password')) return;

    const Salt = randomBytes(16).toString();
    const hashedPassword = createHmac('SHA256', Salt).update(User.Password).digest('hex');

    this.Password = hashedPassword;
    this.Salt = Salt;

    next();
});

// Create static function
userSchema.static('matchPasswordAndGenerateToken', async function (Email, Password) {
    const user = await this.findOne({ Email });
    if (!user) throw new Error('User not Found!');

    const salt = user.Salt;
    const hashedPassword = user.Password;

    const userProvidedHash = createHmac('SHA256', salt).update(Password).digest('hex');

    if (userProvidedHash !== hashedPassword) throw new Error('Incorrect Password!');

    user.Password = undefined;
    user.Salt = undefined;

    const token = createTokenforUser(user);

    return token;
})

// User model
const User = model('User', userSchema);

// User Export
module.exports = User;