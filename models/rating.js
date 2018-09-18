const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Item } = require('./item');

const RatingSchema = new Schema({
   value: { type: Number, required: true },
   item: { type: Schema.Types.ObjectId, ref: 'Item', required: true }
});

RatingSchema
   .virtual('url')
   .get(function() { return `/boot/ratings/${this._id}` });

module.exports = {
   RatingSchema,
   Rating: mongoose.model('Rating', RatingSchema)
};
