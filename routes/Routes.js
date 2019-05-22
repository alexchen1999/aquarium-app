const express = require('express');
const router = express.Router();

var fishController = require('../controllers/fishController');
var aquariumController = require('../controllers/aquariumController');

//Fish routes
router.get('/getAllFish', fishController.get_all_fish);
router.get('/getFish', fishController.get_fish);
router.post('/createFish', fishController.create_fish);
router.post('/updateFish', fishController.update_fish_info);
router.post('/deleteFish', fishController.delete_fish);

//Aquarium routes
router.get('/getAllAquariums', aquariumController.get_all_aquariums);
router.get('/getAquarium', aquariumController.get_aquarium);
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

module.exports = router;