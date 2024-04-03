var express = require('express');
var router = express.Router();
const Model_lab = require('../model/model_lab.js');

router.get("/",  (req, res) => {
    res.render("admin/dashboard");
});

module.exports = router;
