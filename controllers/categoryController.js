const { CategorySchema } = require('../models/category');

exports.categorySchema = function(req, res, next) {
   res.json(CategorySchema);
};
