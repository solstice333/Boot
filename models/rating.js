const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Item } = require('./item');

const RatingSchema = new Schema({
   value: { type: Number, required: true, index: true, min: 0, max: 5 },
   item: { type: Schema.Types.ObjectId, ref: 'Item', required: true }
});

RatingSchema
   .virtual('url')
   .get(function() { return `/boot/ratings/${this._id}` });

const Rating = mongoose.model('Rating', RatingSchema);

Rating.createIndexes();

module.exports = { RatingSchema, Rating };
