import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});

module.exports = mongoose.model('accounts', schema);

