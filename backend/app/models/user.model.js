const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: Number,
    profileImg: String
}, {
    timpestamps: true
});

module.exports = mongoose.model('User', userSchema);