var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const Model_lab = require("../Model/model_lab.js");
const Model_user = require("../Model/model_pengguna.js");

router.get("/", async function (req, res) {
    let userID = req.session.userId
    let user = await Model_user.getId()
    let rows = await Model_lab.getAllByUserID();
    res.render("mahasiswa/lab/index",{
        nama: user[0].nama_pengguna,
        role: user[0].role  
    });
});

module.exports = router;
