var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fishSchema = new Schema({
    commonName: {type: String, required: true},
    scientificName: {type: String},
    length: Number, //in inches
    tempLowerBound: Number, //Fahrenheit
    tempUpperBound: Number,
    pHLowerBound: Number,
    pHUpperBound: Number,
    recommendedTankSize: Number,
    image: String
});

module.exports = mongoose.model('Fish', fishSchema);

