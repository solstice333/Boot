const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
   name: { 
      type: String, lowercase:true, required: true, 
      index: true, unique: true 
   }
});

CategorySchema
   .virtual('url')
   .get(function() { return `/boot/categories/${this._id}` });

const Category = mongoose.model('Category', CategorySchema);

Category.createIndexes();

module.exports = { CategorySchema, Category };
