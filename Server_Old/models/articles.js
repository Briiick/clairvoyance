import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    title: String,
    shortContent: String,
    fullContent: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'accounts'
    },
    date: String,
    slug: String
});

module.exports = mongoose.model('articles', schema);

