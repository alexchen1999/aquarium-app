const Aquarium = require('../models/Aquarium.js');
var mongoose = require('mongoose');
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

exports.get_aquarium = function(req, res) {
    Aquarium.findOne({name: req.query.name}, function(err, aquarium){
        if (err) {
            console.log('Error in finding the specified aquarium');
        } else {
            res.render('showaquarium', {aquarium: aquarium});
        }
    });
};

exports.create_aquarium = function(req, res) {
    let aquarium = new Aquarium({
        name: req.body.name,
        size: req.body.size,
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
    var variety = req.body.variety;
    var quantity = req.body.quantity;

    Aquarium.findOneAndUpdate({name: name}, {$push: {'fish': {variety, quantity}}}, 
    {new: true}, function(err, aquarium) {
        if (err) {
            console.log('Error in adding fish');
        } else {
            res.send(aquarium);
        }
    });
};

exports.remove_fish = function(req, res) {
    var name = req.body.name;

    Aquarium.findOneAndUpdate({name: name}, {$pull: {'fish': {variety: req.body.variety}}}, 
    {new: true}, function(err, aquarium) {
        if (err) {
            console.log('Error in removing fish');
        } else {
            res.send(aquarium);
        }
    });
};


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
            res.send(aquarium);
        }
    });
};