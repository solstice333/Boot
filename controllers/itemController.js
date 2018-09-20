const { Item, ItemSchema } = require('../models/item');
const createError = require('http-errors');

exports.index = function(req, res, next) {
  res.render('index', { title: 'Boot REST API documentation' });
};

exports.items = function(req, res, next) {
   Item.find()
      .populate('category')
      .then(items => res.json(items))
      .catch(next);
};

exports.itemDetail = function(req, res, next) {
   next(createError(404, 'item detail not yet implemented'));
};

exports.itemSchema = function(req, res, next) {
   res.json(ItemSchema);
};
