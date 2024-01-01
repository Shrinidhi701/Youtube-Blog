const mongoose = require('mongoose');

// Connect
const connectToMongoDB = async () => {
    mongoose
        .connect('mongodb+srv://Shrinidhi:Simple99@youtube-blog.4jwyem4.mongodb.net/Blogify')
        .then(() => console.log('Connected to MongoDB Successfully!!'))
        .catch((err) => console.log(err));
}

// Export
module.exports = {
    connectToMongoDB
}