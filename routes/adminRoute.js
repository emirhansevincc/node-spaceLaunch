const admin = require('../controllers/admin');
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const panelControl = require('../customControlMiddlewares/panelControl');
const loginBlockAfterLogin = require('../customControlMiddlewares/loginBlockAfterLogin');

router.route('/').get(loginBlockAfterLogin, admin.getAdminLogin);
router.route('/panel').get(panelControl, admin.getAdminPanel);
router.route('/panel/createNewLaunch').post(admin.createNewLaunch);
router.route('/panel/createNewNews').post(admin.createNewNews);
router.route('/panel/createNewEvent').post(admin.createEvent);
router.route('/panel/createNewAstronaut').post(admin.createNewAstronaut);

router.route('/login').post([

    body('adminEmail').isEmail().withMessage('Please enter a valid email address'),
    body('adminPassword').not().isEmpty().withMessage('Please enter a password')

], admin.loginAdmin);

router.route('/panel/logout').get(admin.logoutAdmin);
router.route('/panel/deleteLaunch/:slug').delete(admin.deleteLaunch);
router.route('/panel/deleteAstronaut/:slug').delete(admin.deleteAstronaut);
router.route('/panel/deleteEvent/:slug').delete(admin.deleteEvent);
router.route('/panel/deleteNews/:slug').delete(admin.deleteNews);

module.exports = router;