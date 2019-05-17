var express = require('express');
var router = express.Router();

var fishController = require('./contollers/fishController.js');
var aquariumController = require('./controllers/aquariumController.js');

//Fish routes
router.get('/getAllFish', fishController.get_all_fish);
router.get('/getFish', fishController.get_fish);
router.post('/createFish', fishController.create_fish);
router.post('/updateFish', fishController.update_fish);
router.post('/deleteFish', fishController.delete_fish);

//Aquarium routes
router.get('/getAllAquariums', aquariumController.get_all_aquariums);
router.get('/getAquarium', aquariumController.get_aquarium);
router.post('/createAquarium', aquariumController.create_aquarium);
router.post('/updateAquarium', aquariumController.update_aquarium);
router.post('/deleteAquarium', aquariumController.delete_aquarium);

module.exports = router;