var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    title: {type: String},
    site: {type: String},
    category: {type: String},
    count: {type: Number},
    url: {type: String},
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Auction', schema);