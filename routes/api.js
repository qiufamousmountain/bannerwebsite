const express = require('express');
const router = express.Router();

const banner = require('../controller/banner');

/* GET banner listing. */
router.get('/getBanner', (req, res, next) => {

banner.getBanner(req,res,next)
});

module.exports = router;
