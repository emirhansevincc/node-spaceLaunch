const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify')

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
    slug: {
        type: String,
        unique: true
    }
});

NewsSchema.pre('validate', function(next) {
    this.slug = slugify(this.title, { 
        lower: true ,
        strict: true
    });
    next();
});

const News = mongoose.model('News', NewsSchema);
module.exports = News;