const { RatingSchema } = require('../models/rating');

exports.ratingSchema = function(req, res, next) {
   res.json(RatingSchema);
};
