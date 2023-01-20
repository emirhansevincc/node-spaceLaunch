const Launch = require('../models/Launch');

exports.getHomePage = async(req, res) => {
    try {
        const launch = await Launch.find();
        res.status(200).render('index',{
            launch
        });
    } catch (error) {
        req.status(404).json({
            status: 'fail',
            message: error
        });
    }
}

exports.getLaunchesPage = async(req, res) => {
    try {
        const launch = await Launch.find();
        res.status(200).render('launches',{
            launch
        });
    } catch (error) {
        req.status(404).json({
            status: 'fail',
            message: error
        });
    }
}

exports.getAstronautsPage = (req, res) => {
    res.status(200).render('astronauts');
}