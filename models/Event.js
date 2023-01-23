const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify')

const EventSchema = new Schema({
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
    slug: {
        type: String,
        unique: true
    }
});

EventSchema.pre('validate', function(next) {

    this.slug = slugify(this.title, { 
        lower: true ,
        strict: true
    });

    next();
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;