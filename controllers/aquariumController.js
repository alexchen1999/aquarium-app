const Aquarium = require('../models/Aquarium.js');
const Fish = require('../models/Fish.js')
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/myDatabase');

exports.get_all_aquariums = function(req, res){
    Aquarium.find({}, function(err, aquariums){
        if (err){
            console.log('Error in getting all aquariums');
        } else {
            res.render('allaquariums', {aquariums: aquariums});
        }
    });
};

exports.get_all_aquariums_data = function(req, res){
    Aquarium.find({}, function(err, aquariums){
        if (err){
            console.log('Error in getting all aquariums');
        } else {
            res.send(aquariums);
        }
    });
};

exports.get_aquarium = function(req, res) {
    Aquarium.findOne({name: req.query.name}, function(err, aquarium){
        if (err) {
            console.log('Error in finding the specified aquarium');
        } else {
            res.render('showaquarium', {aquarium: aquarium});
        }
    });
};

exports.get_aquarium_data = function(req, res) {
    Aquarium.findOne({name: req.query.name})
    .exec()
    .then(async (aquarium) => {
        var totalLength = 0;
        var capacity = aquarium.capacity;
        var tempLowerBoundSum = 0;
        var tempUpperBoundSum = 0;
        var pHLowerBoundSum = 0;
        var pHUpperBoundSum = 0;
        var count = 0;

        for (const fish of aquarium.fish) {

            var quantity = fish.quantity;

            const f = await Fish.
            findOne({commonName: fish.variety})
            .exec()
            .then((fish) => {
                count++;
                totalLength += fish.length * quantity;
                tempLowerBoundSum += fish.tempLowerBound;
                tempUpperBoundSum += fish.tempUpperBound;
                pHLowerBoundSum += fish.pHLowerBound;
                pHUpperBoundSum += fish.pHUpperBound;
            })
            .catch((err) => {
                console.log(err);
            });
        }
        console.log(totalLength);
        console.log(capacity);
        var stocking_level = "" + (totalLength / capacity) * 100;
        var tempLowerBoundAvg = "" + (tempLowerBoundSum / count);
        var tempUpperBoundAvg = "" + (tempUpperBoundSum / count);
        var pHLowerBoundAvg = "" + (pHLowerBoundSum / count);
        var pHUpperBoundAvg = "" + (pHUpperBoundSum / count);
        var data = {aquarium, stocking_level, tempLowerBoundAvg,
        tempUpperBoundAvg, pHLowerBoundAvg, pHUpperBoundAvg};
        console.log(data);
        res.send(data);
    })
    .catch((err) => { 
        console.log(err);
    })
};

exports.create_aquarium = function(req, res) {
    let aquarium = new Aquarium({
        name: req.body.name,
        capacity: req.body.capacity,
        fish: []
    });

    aquarium.save(function(err){
        if (err) {
            console.log('Error in creating this aquarium');
        } else {
            res.render('aquariumadded', {aquarium: aquarium});
        }
    });
};

exports.add_fish = function(req, res) {
    var name = req.body.name;
    console.log(name);
    var variety = req.body.variety;
    console.log(variety);
    var quantity = req.body.quantity;
    console.log(quantity);

    Aquarium.findOneAndUpdate({name: name}, {$push: {'fish': {variety, quantity}}}, 
    {new: true}, function(err, aquarium) {
        if (err) {
            console.log('Error in adding fish');
        } else {
            console.log(aquarium);
            console.log(aquarium.name);
            res.render('fishsuccessfullyadded', {aquarium: aquarium, variety: variety, quantity: quantity});
        }
    });
};

exports.remove_fish = function(req, res) {
    var name = req.query.name;

    Aquarium.findOneAndUpdate({name: name}, {$pull: {'fish': {variety: req.body.variety}}}, 
    {new: true}, function(err, aquarium) {
        if (err) {
            console.log('Error in removing fish');
        } else {
            res.redirect('/getAquarium?name=' + name);
        }
    });
};


//unnecessary
/*

exports.update_fish_quantity = function(req, res) {
    var name = req.body.name;
    var variety = req.body.variety;
    var quantity = req.body.quantity;

    Aquarium.findOneAndUpdate({name: name}, {$set: {'fish.$[element].quantity': quantity}}, 
    {new: true, arrayFilters:[{'element.variety': variety}]}, function(err, aquarium) {
        if (err) {
            console.log('Error in updating quantity of ' + variety);
        } else {
            res.send(aquarium);
        }
    });
};

*/

exports.update_aquarium = function(req, res) {
    Aquarium.findOneAndUpdate({name: req.body.name}, {$set: req.body}, {new: true}, function(err, aquarium){
        if (err) {
            console.log('Error in updating this aquarium');
        } else {
            console.log('Aquarium successfully updated');
            res.send(aquarium);
        }
    });
};

exports.delete_aquarium = function(req, res) {
    Aquarium.findOneAndDelete({name: req.body.name}, function(err, aquarium){
        if (err) {
            console.log('Error in deleting this aquarium');
        } else {
            console.log('Aquarium successfully deleted');
            res.render('aquariumdeleted', {aquarium: aquarium});
        }
    });
};