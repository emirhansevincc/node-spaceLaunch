module.exports = (req, res, next) => {

    if (req.session.adminId) {
        res.redirect('/');
    }

    next();

}