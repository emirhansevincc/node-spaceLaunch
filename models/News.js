const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
});

const News = mongoose.model('News', NewsSchema);
module.exports = News;