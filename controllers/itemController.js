const { ItemSchema } = require('../models/item');

exports.index = function(req, res, next) {
  res.render('index', { title: 'Boot REST API documentation' });
};

exports.items = function(req, res, next) {
  res.send('boot items');
};

exports.itemSchema = function(req, res, next) {
   res.json(ItemSchema);
};
