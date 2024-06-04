var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const model_peminjaman = require("../Model/model_peminjaman.js");

const Model_pengguna = require("../Model/model_pengguna.js");

const Model_lab = require("../Model/model_lab.js");


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
  res.render("admin/peminjaman/index", {
    data: rows,
    convert
  });
});


router.get("/create", async function (req, res, next) {
  let rows = await model_peminjaman.getAll();
  let data_pengguna = await Model_pengguna.getAll();
  let data_lab = await Model_lab.getAll();
  res.render("admin/peminjaman/create", {
    data: rows,
    data_pengguna: data_pengguna,
    data_lab: data_lab,
  });
});

router.post("/store", async function (req, res, next) {
  try {
    let {
      id_pengguna,
      id_lab,
      tanggal_peminjaman,
      waktu_mulai,
      waktu_selesai,
      disetujui,
      alasan,
    } = req.body;
    let Data = {
      id_pengguna,
      id_lab,
      tanggal_peminjaman,
      waktu_mulai,
      waktu_selesai,
      disetujui,
      alasan,
    };
    await model_peminjaman.Store(Data);
    req.flash("success", "Berhasil menyimpan data");
    res.redirect("/peminjaman");
  } catch (error) {
    console.error(error);
    req.flash("error", "Gagal menyimpan data");
    res.redirect("/peminjaman");
  }
});
router.get("/edit/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let data_pengguna = await Model_pengguna.getAll();
    let data_lab = await Model_lab.getAll();
    let rows = await model_peminjaman.getById(id);
    res.render("admin/peminjaman/edit", {
      id: id,
      id_pengguna: rows[0].id_pengguna,
      id_lab: rows[0].id_lab,
      tanggal_peminjaman: rows[0].tanggal_peminjaman,
      waktu_mulai: rows[0].waktu_mulai,
      waktu_selesai: rows[0].waktu_selesai,
      disetujui: rows[0].disetujui,
      alasan: rows[0].alasan,
      data_pengguna: data_pengguna,
      data_lab: data_lab,
      nama_pengguna : rows[0].nama_pengguna,
      nama_lab : rows[0].nama_lab,
      convert,
    });
  } catch (error) {
    res.redirect("/peminjaman");
    console.error(error);
  }
});

router.post("/update/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let {
      id_pengguna,
      id_lab,
      tanggal_peminjaman,
      waktu_mulai,
      waktu_selesai,
      disetujui,
      alasan,
    } = req.body;
    let Data = {
      id_pengguna,
      id_lab,
      tanggal_peminjaman,
      waktu_mulai,
      waktu_selesai,
      disetujui,
      alasan,
    };
    await model_peminjaman.Update(id, Data);
    req.flash("success", "Berhasil mengupdate data");
    res.redirect("/peminjaman");
  } catch (error) {
    console.error(error);
    req.flash("error", "Gagal mengupdate data");
    res.redirect("/peminjaman");
  }
});

router.post("/disetujui/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let Data = {
      disetujui : 'ya'
    };
    await model_peminjaman.Update(id, Data);
    req.flash("success", "Berhasil mengupdate data");
    res.redirect("/peminjaman");
  } catch (error) {
    console.error(error);
    req.flash("error", "Gagal mengupdate data");
    res.redirect("/peminjaman");
  }
});

router.get("/delete/(:id)", async function (req, res, next) {
  let id = req.params.id;
  await model_peminjaman.Delete(id);
  req.flash("success", "Berhasil menghapus data");
  res.redirect("/peminjaman");
});

module.exports = router;
