var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fishSchema = new Schema({
    commonName: {type: String, required: true},
    scientificName: {type: String, required: true},
    length: Number, //in inches
    tempLowerBound: Number, //Fahrenheit
    tempUpperBound: Number,
    pHLowerBound: Number,
    pHUpperBound: Number,
    recommendedTankSize: Number
});

module.exports = mongoose.model('Fish', fishSchema);

