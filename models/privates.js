var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    id: {type: String, required: true},
    pwd: {type: String, required: true},
    first: {type: String, required: true},
    last: {type: String, required: true},
    email: {type: String, required: true},
    img: String,
    messages: [{type: Schema.Types.ObjectId, ref: 'Product'},]
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Private', schema);