const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');
const ratingController = require('../controllers/ratingController');
const categoryController = require('../controllers/categoryController');

router.get('/', itemController.index);

router.get('/itemSchema', itemController.itemSchema);

router.get('/items', itemController.items);

router.get('/items/:id', itemController.itemDetail);

router.get('/ratingSchema', ratingController.ratingSchema);

router.get('/categorySchema', categoryController.categorySchema);

module.exports = router;
