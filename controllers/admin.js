const Launch = require('../models/Launch');
const News = require('../models/News');

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

exports.createNewNews = async(req, res) => {
    try {
        const news = await News.create({
            title: req.body.newsTitle,
            // date: req.body.newsDate,
            description: req.body.newsDescription,
            from: req.body.newsFrom
        });
        res.status(201).redirect('/')
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        });
    }
}