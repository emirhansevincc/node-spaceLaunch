const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify')

const AstroSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
    agency: {
        type: String,
        required: true
    },
    biography: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
});

AstroSchema.pre('validate', function(next) {

    this.slug = slugify(this.name, { 
        lower: true ,
        strict: true
    });

    next();
});

const Astronaut = mongoose.model('Astronaut', AstroSchema);
module.exports = Astronaut;