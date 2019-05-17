const Aquarium = require('../models/Aquarium.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myDatabase');

exports.get_all_aquariums = function(req, res){
    Aquarium.find({}, function(err, aquariums){
        if (err){
            console.log('Error in getting all aquariums');
        } else {
            res.send(aquariums);
        }
    });
};

exports.get_aquarium = function(req, res) {
    Aquarium.findOne({name: req.body.name}, function(err, aquarium){
        if (err) {
            console.log('Error in finding the specified aquarium');
        } else {
            res.send(aquarium);
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
            res.send('Aquarium saved successfully');
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