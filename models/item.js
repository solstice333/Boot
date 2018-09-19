const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Rating } = require('./rating');

const ItemSchema = new Schema({
   name: { type: String, required: true, lowercase: true, index: true },
   price: { type: Number, required: true, default: 0, index: true },
   inventory: { type: Number, required: true, default: 0, index: true },
   category: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
});

ItemSchema
   .virtual('url')
   .get(function() { return `/boot/items/${this._id}` });

ItemSchema
   .virtual('rating')
   .get(function() { 
      return Rating.find({ item: this._id })
         .then(ratings => {
            if (!ratings.length) 
               return null;
            let total = ratings.reduce((total, cur) => total + cur, 0);
            return total/ratings.length;
         });
   });

const Item = mongoose.model('Item', ItemSchema);

Item.createIndexes();

module.exports = { ItemSchema, Item };
