const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
   res.redirect('/boot');
});

module.exports = router;
