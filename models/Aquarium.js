var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Aquarium = new Schema({
    name: String, //identification for a specific aquarium
    capacity: Number, //number of gallons
    fish: [{variety: String, quantity: Number}] //specifies variety and quantity of fish in tank
});


module.exports = mongoose.model('Aquarium', Aquarium);