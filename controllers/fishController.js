const Fish = require('../models/Fish.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myDatabase');

exports.get_all_fish = function(req, res) {
    Fish.find({}, function(err, fish){
        if (err){
            console.log('Error: could not get fish');
        } else {
            res.render('allfish', {fish: fish});
        }
    });
};

exports.get_all_fish_data = function(req, res) {
    Fish.find({}, function(err, fish){
        if (err){
            console.log('Error: could not get fish');
        } else {
            res.send(fish);
        }
    });
};

exports.get_fish = function(req, res) {
    Fish.findOne({commonName: req.query.commonName}, function(err, fish){
        if (err){
            console.log('Error: fish was not found');
        } else {
            res.render('showfish', {fish: fish});
        }
    });
};

exports.create_fish = function(req, res) {
    console.log('reaches here');
    console.log(req.body.commonName);
    let fish = new Fish({
        commonName: req.body.commonName,
        scientificName: req.body.scientificName,
        length: req.body.len,
        tempLowerBound: req.body.tmpLow,
        tempUpperBound: req.body.tmpHigh,
        pHLowerBound: req.body.pHLow,
        pHUpperBound: req.body.pHHigh,
        recommendedTankSize: req.body.recTankSize
    });

    fish.save(function(err){
        if (err) {
            console.log('Error: fish could not be created');
        } else {
            res.render('fishadded', {fish: fish});
        };
    });
};

exports.update_fish_info = function(req, res) {
    Fish.findOneAndUpdate({commonName: req.query.name}, {$set: req.body}, {new: true}, function(err, fish){
        if (err) {
            console.log('Error in updating fish info');
        } else {
            res.send(fish);
        }
    });
};

exports.delete_fish = function(req, res) {
    Fish.findOneAndDelete({commonName: req.query.commonName}, function(err, fish){
        if (err) {
            console.log('Error in deleting this fish');
        } else {
            console.log('Fish successfully deleted from database');
            res.send(fish);
        }
    });
};