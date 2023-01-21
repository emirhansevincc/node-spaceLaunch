const admin = require('../controllers/admin');
const express = require('express');
const router = express.Router();

router.route('/').get(admin.getAdminLogin);
router.route('/panel').get(admin.getAdminPanel);
router.route('/panel/createNewLaunch').post(admin.createNewLaunch);
router.route('/panel/createNewNews').post(admin.createNewNews);

module.exports = router;