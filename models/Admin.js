const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const AdminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'admin'
    }
});

AdminSchema.pre('save', function(next) {
    const admin = this;
    bcrypt.hash(admin.password, 10, (err, hash) => {
        admin.password = hash;
        next();
    });
});

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;