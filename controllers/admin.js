const Launch = require('../models/Launch');

exports.getAdminPanel = (req, res) => {
    res.status(200).render('adminPanel');
}

exports.getAdminLogin = (req, res) => {
    res.status(200).render('admin');
}

exports.createNewLaunch = async(req, res) => {
    try {
        const launch = await Launch.create({
            name: req.body.launchName,
            date: req.body.launchDate,
            description: req.body.launchDescription,
            info: req.body.launchInfo
        });
        res.status(201).redirect('/')
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        });
    }
}