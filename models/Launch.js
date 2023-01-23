const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify')

const LaunchSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    secondSlug: {
        type: String,
        unique: true
    },
    rocket: {
        type: String,
        required: true
    },
    windowStart: {
        type: String,
        required: true
    },
    windowEnd: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
});

LaunchSchema.pre('validate', function(next) {

    const splitSpaces = (str) => {
        return str.split(' ').join('_');
    }

    this.slug = slugify(this.name, { 
        lower: true ,
        strict: true
    });

    this.secondSlug = splitSpaces(this.name);

    next();
});

const Launch = mongoose.model('Launch', LaunchSchema);
module.exports = Launch;