const Launch = require('../models/Launch');
const News = require('../models/News');
const Event = require('../models/Event');
const Astronaut = require('../models/Astronaut');
const Admin = require('../models/Admin');
const bcrypt = require("bcrypt");

exports.getAdminPanel = async(req, res) => {
    const whichAdmin = await Admin.findById(req.session.adminId);

    const launch = await Launch.find();
    const news = await News.find();
    const events = await Event.find();
    const astronauts = await Astronaut.find();

    res.status(200).render('adminPanel', {
        whichAdmin,
        launch,
        news,
        events,
        astronauts
    });
    
    console.log(req.session.adminId);
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
            info: req.body.launchInfo,
            rocket: req.body.launchRocket,
            windowStart: req.body.launchWindowStart,
            windowEnd: req.body.launchWindowEnd,
            company: req.body.launchCompany,
            status: req.body.launchStatus,
        });
        req.flash("success", "Launch created successfully");
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
            description: req.body.newsDescription,
            from: req.body.newsFrom,
        });
        req.flash("success", "News created successfully");
        res.status(201).redirect('/')
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        });
    }
}

exports.createEvent = async(req, res) => {
    try {
        const event = await Event.create({
            title: req.body.eventTitle,
            description: req.body.eventDescription
        });
        req.flash("success", "Event created successfully");
        res.status(201).redirect('/')
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        });
    }
}

exports.createNewAstronaut = async(req, res) => {
    try {
        const astronaut = await Astronaut.create({
            name: req.body.astroName,
            description: req.body.astroDescription,
            nationality: req.body.astroNationality,
            birthday: req.body.astroBirthday,
            agency: req.body.astroAgency,   
            biography: req.body.astroBiography,
        });
        req.flash("success", "Astronaut created successfully");
        res.status(201).redirect('/')
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        });
    }
}

exports.loginAdmin = async(req, res) => {
    try {
        const adminEmail = req.body.adminEmail;
        const adminPassword = req.body.adminPassword;

        Admin.findOne({email: adminEmail}, (err, admin) => {
            if (err) {
                res.status(400).json({
                    status: 'fail',
                    message: err
                });
            } else {
                if (admin) {
                    bcrypt.compare(adminPassword, admin.password, (err, result) => {
                        if (result === true) {
                            req.session.adminId = admin._id;
                            res.status(200).redirect('/admin/panel');
                        } else {
                            res.status(401).json({
                                status: 'fail',
                                message: 'Password is incorrect'
                            });
                        }
                    })
                } else {
                    res.status(404).redirect('/admin');
                }
            }
        })
        

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        });
    }
}

exports.logoutAdmin = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(400).json({
                status: 'fail',
                message: err
            });
        } else {
            res.status(200).redirect('/');
        }
    })
}

exports.deleteLaunch = async(req, res) => {
    try {
        await Launch.findOneAndRemove({slug: req.params.slug});
        req.flash("success", "Launch deleted successfully!");
        res.status(204).redirect('/admin/panel');
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        });
    }
}

exports.deleteAstronaut = async(req, res) => {
    try {
        await Astronaut.findOneAndRemove({slug: req.params.slug});
        req.flash("success", "Astronaut deleted successfully!");
        res.status(204).redirect('/admin/panel');
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        });
    }
}

exports.deleteEvent = async(req, res) => {
    try {
        await Event.findOneAndRemove({slug: req.params.slug});
        req.flash("success", "Event deleted successfully!");
        res.status(204).redirect('/admin/panel');
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        });
    }
}

exports.deleteNews = async(req, res) => {
    try {
        await News.findOneAndRemove({slug: req.params.slug});
        req.flash("success", "News deleted successfully!");
        res.status(204).redirect('/admin/panel');
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        });
    }
}