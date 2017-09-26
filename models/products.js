var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    title: {type: String, required: true},
    site: {type: String, required: true},
    category: {type: String, required: true},
    count: {type: String, required: true},
    url: {type: String, required: true},
    img: {type: String, required: true},
    messages: [{type: Schema.Types.ObjectId, ref: 'Private'}]
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Auction_노트북', schema);