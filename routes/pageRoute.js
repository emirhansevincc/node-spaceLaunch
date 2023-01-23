const pageController = require('../controllers/pageController');
const express = require('express');
const router = express.Router();

router.route('/').get(pageController.getHomePage);
router.route('/launches').get(pageController.getLaunchesPage);
router.route('/astronauts').get(pageController.getAstronautsPage);
router.route('/astronauts/:slug').get(pageController.getAstronautsSinglePage);
router.route('/launches/:slug').get(pageController.getLauncheSinglePage);

module.exports = router;