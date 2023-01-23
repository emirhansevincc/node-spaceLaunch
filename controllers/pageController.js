const Launch = require('../models/Launch');
const News = require('../models/News');
const Event = require('../models/Event');
const Astronaut = require('../models/Astronaut');

exports.getHomePage = async(req, res) => {
    try {
        const launch = await Launch.find();
        const news = await News.find();
        const events = await Event.find();

        res.status(200).render('index',{
            launch,
            news,
            events
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
        const news = await News.find();
        const events = await Event.find();
        const launch = await Launch.find();

        res.status(200).render('launches',{
            launch,
            news,
            events
        });
    } catch (error) {
        req.status(404).json({
            status: 'fail',
            message: error
        });
    }
}

exports.getAstronautsPage = async(req, res) => {

    const news = await News.find();
    const astronauts = await Astronaut.find();

    res.status(200).render('astronauts',{
        news,
        astronauts
    });
}

exports.getAstronautsSinglePage = async(req, res) => {

    const findAstronaut = await Astronaut.findOne({slug: req.params.slug});
    const news = await News.find();

    res.status(200).render('astroSingle', {
        findAstronaut,
        news
    });

}

exports.getLauncheSinglePage = async(req, res) => {

    const findLaunch = await Launch.findOne({slug: req.params.slug});
    const news = await News.find();

    res.status(200).render('launchSingle', {
        findLaunch,
        news
    });

}