const admin = require('../controllers/admin');
const express = require('express');
const router = express.Router();

const panelControl = require('../customControlMiddlewares/panelControl');
const loginBlockAfterLogin = require('../customControlMiddlewares/loginBlockAfterLogin');

router.route('/').get(loginBlockAfterLogin, admin.getAdminLogin);
router.route('/panel').get(panelControl, admin.getAdminPanel);
router.route('/panel/createNewLaunch').post(admin.createNewLaunch);
router.route('/panel/createNewNews').post(admin.createNewNews);
router.route('/panel/createNewEvent').post(admin.createEvent);
router.route('/panel/createNewAstronaut').post(admin.createNewAstronaut);
router.route('/login').post(admin.loginAdmin);
router.route('/panel/logout').get(admin.logoutAdmin);
router.route('/panel/deleteLaunch/:slug').delete(admin.deleteLaunch);
router.route('/panel/deleteAstronaut/:slug').delete(admin.deleteAstronaut);
router.route('/panel/deleteEvent/:slug').delete(admin.deleteEvent);

module.exports = router;