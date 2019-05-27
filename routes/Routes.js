const express = require('express');
const router = express.Router();

var fishController = require('../controllers/fishController');
var aquariumController = require('../controllers/aquariumController');

//Fish routes
router.get('/getAllFish', fishController.get_all_fish);
router.get('/getAllFishData', fishController.get_all_fish_data);
router.get('/getFish', fishController.get_fish);
router.post('/createFish', fishController.create_fish);
router.post('/updateFish', fishController.update_fish_info);
router.post('/deleteFish', fishController.delete_fish);

//Aquarium routes
router.get('/getAllAquariums', aquariumController.get_all_aquariums);
router.get('/getAllAquariumData', aquariumController.get_all_aquariums_data);
router.get('/getAquarium', aquariumController.get_aquarium);
router.get('/getAquariumData', aquariumController.get_aquarium_data);
router.post('/createAquarium', aquariumController.create_aquarium);
router.post('/addFish', aquariumController.add_fish);
router.post('/removeFish', aquariumController.remove_fish);
router.post('/updateFishQuantity', aquariumController.update_fish_quantity);
router.post('/updateAquarium', aquariumController.update_aquarium);
router.post('/deleteAquarium', aquariumController.delete_aquarium);

//render home page
router.get('/', function(req, res) {
    res.render('home');
});

//render create fish page
router.get('/createFishForm', function(req, res) {
    res.render('createfish');
});

//render create aquarium page
router.get('/createAquariumForm', function(req, res) {
    res.render('createaquarium');
});

//render add fish to aquarium page
router.get('/addFishToAquarium', function(req, res) {
    res.render('addfishtoaquarium');
});



module.exports = router;