const pageController = require('../controllers/pageController');
const express = require('express');
const router = express.Router();

router.route('/').get(pageController.getHomePage);
router.route('/launches').get(pageController.getLaunchesPage);
router.route('/astronauts').get(pageController.getAstronautsPage);

module.exports = router;