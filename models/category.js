const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
   name: { type: String, required: true }
});

CategorySchema
   .virtual('url')
   .get(function() { return `/boot/categories/${this._id}` });

module.exports = {
   CategorySchema,
   Category: mongoose.model('Category', CategorySchema)
};
