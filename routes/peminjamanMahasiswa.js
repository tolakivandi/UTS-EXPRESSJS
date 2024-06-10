var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const Model_lab = require("../Model/model_lab.js");
const Model_user = require("../Model/model_pengguna.js");
const model_peminjaman = require("../Model/model_peminjaman.js");
const Model_pengguna = require("../Model/model_pengguna.js");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images/upload");
    },
    filename: (req, file, cb) => {
      console.log(file);
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage: storage });
  
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

router.get("/", async function (req, res, next) {
    let rows = await model_peminjaman.getAll();
    let user = await Model_user.getId(req.session.userId)
    res.render("mahasiswa/peminjaman/index", {
        data: rows,
        convert,
        nama: user[0].nama_pengguna,
        role: user[0].role
    });
});

router.get("/create", async function (req, res, next) {
    let rows = await model_peminjaman.getAll();
    let data_pengguna = await Model_pengguna.getAll();
    let data_lab = await Model_lab.getAll();
    let user = await Model_user.getId(req.session.userId)
    res.render("mahasiswa/peminjaman/create", {
      data: rows,
      data_pengguna: data_pengguna,
      data_lab: data_lab,
      nama: user[0].nama_pengguna,
      role: user[0].role
    });
  });

  router.post("/store", async function (req, res, next) {
    try {
      let id_pengguna = req.session.userId
      let {
        id_lab,
        tanggal_peminjaman,
        waktu_mulai,
        waktu_selesai,
        alasan,
      } = req.body;
      let Data = {
        id_pengguna: id_pengguna,
        id_lab,
        tanggal_peminjaman,
        waktu_mulai,
        waktu_selesai,
        disetujui: 'tunggu',
        alasan,
      };

      let data = {
        tersedia: '0'
      }
      await model_peminjaman.Store(Data);
      await Model_lab.Update(id_lab, data);
      req.flash("success", "Berhasil menyimpan data");
      res.redirect("/mahasiswa/peminjaman");
    } catch (error) {
      console.error(error);
      req.flash("error", "Gagal menyimpan data");
      res.redirect("/mahasiswa/peminjaman");
    }
  });

module.exports = router;
