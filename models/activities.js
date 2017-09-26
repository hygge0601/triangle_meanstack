var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    id: {type: String, require: true},
    keyword: {type: String, required: true},
    date: {type: Date, required: true},
    no1: {type: String, required: true},
    no1_url: {type: String, required: true},
    no2: {type: String, required: true},
    no2_url: {type: String, required: true},
    no3: {type: String, required: true},
    no3_url: {type: String, required: true},
    messages: [{type: Schema.Types.ObjectId, ref: 'Private'}]
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Activity', schema);