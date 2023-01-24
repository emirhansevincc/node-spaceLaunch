const Admin = require('../models/Admin');

module.exports = (req, res, next) => {
    Admin.findById(req.session.adminId, (err, admin) => {
        if (err || !admin) {
            res.status(400).redirect('/');
        } else {
            if (admin) {
                next();
            } else {
                res.status(401).redirect('/admin');
            }
        }
    })
}