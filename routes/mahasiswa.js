var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const Model_lab = require("../Model/model_lab.js");
const Model_user = require("../Model/model_pengguna.js");

router.get("/", async function (req, res) {
    let user = await Model_user.getId(req.session.userId)
    res.render("mahasiswa/dashboard", {
        nama: user[0].nama_pengguna,
        role: user[0].role
    });
});

module.exports = router;
