var express = require('express');
var router = express.Router();

var fishController = require('../contollers/fishController');
var aquariumController = require('../controllers/aquariumController');

//Fish routes
router.get('/getAllFish', fishController.get_all_fish);
router.get('/getFish', fishController.get_fish);
router.post('/createFish', fishController.create_fish);
router.post('/updateFish', fishController.update_fish);
router.post('/deleteFish', fishController.delete_fish);