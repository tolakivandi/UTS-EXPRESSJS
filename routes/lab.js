var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
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

router.get("/", async function (req, res, next) {
  let rows = await Model_lab.getAll();
  res.render("admin/lab/index", {
    data: rows,
  });
});

router.get("/create", async function (req, res, next) {
  let rows = await Model_lab.getAll();
  res.render("admin/lab/create", {
    data: rows,
  });
});

router.post("/store", upload.single("gambar"), async function (req, res, next) {
  try {
    let { nama_lab, lokasi, tersedia } = req.body;
    let Data = {
      nama_lab,
      lokasi,
      tersedia,
      gambar: req.file.filename,
    };

    await Model_lab.Store(Data);
    req.flash("succes", "Berhasil menyimpan data");
    res.redirect("/lab");
  } catch (error) {
    req.flash("error", "gagal menyimpan data");
    res.redirect("/lab");
    console.error(error);
  }
});
router.get("/edit/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let rows = await Model_lab.getById(id);
    res.render("admin/lab/edit", {
      data: rows,
      id: rows[0].id_lab, // Ubah id_movie menjadi id_lab
      nama_lab: rows[0].nama_lab,
      lokasi: rows[0].lokasi,
      tersedia: rows[0].tersedia,
      gambar: rows[0].gambar,
    });
  } catch (error) {
    res.redirect("/lab");
    console.error(error);
  }
});

router.post(
  "/update/:id", // Perbaiki path update
  upload.single("gambar"),
  async function (req, res, next) {
    try {
      let id = req.params.id;
      let filebaru = req.file ? req.file.filename : null;
      let rows = await Model_lab.getById(id);
      const namaFileLama = rows[0].gambar;

      if (filebaru && namaFileLama) {
        const pathFileLama = path.join(
          __dirname,
          "../public/images/upload",
          namaFileLama
        );
        fs.unlinkSync(pathFileLama);
      }

      let { nama_lab, lokasi, tersedia } = req.body;
      let gambar = filebaru || namaFileLama;
      let Data = {
        nama_lab,
        lokasi,
        tersedia,
        gambar,
      };

      await Model_lab.Update(id, Data); // Tambahkan await untuk memastikan pembaruan selesai sebelum redirect
      req.flash("success", "Berhasil update data");
      res.redirect("/lab");
    } catch (error) {
      console.error(error);
      req.flash("error", "Gagal update data");
      res.redirect("/lab");
    }
  }
);
// router.post("/delete/:id", async function (req, res, next) {
//   try {
//     let id = req.params.id;
//     let rows = await Model_lab.getById(id);
//     const namaFile = rows[0].gambar;

//     if (namaFile) {
//       const pathFile = path.join(
//         __dirname,
//         "../public/images/upload",
//         namaFile
//       );
//       fs.unlinkSync(pathFile);
//     }

//     await Model_lab.Delete(id);
//     req.flash("success", "Berhasil menghapus data");
//     res.redirect("/lab");
//   } catch (error) {
//     console.error(error);
//     req.flash("error", "Gagal menghapus data");
//     res.redirect("/lab");
//   }
// });

router.get("/delete/:id", async function (req, res, next) {
  try {
    let id = req.params.id;

    // Ambil data lab dari database
    let rows = await Model_lab.getById(id);
    if (!rows || rows.length === 0) {
      throw new Error("Data tidak ditemukan");
    }

    // Periksa apakah ada gambar terkait
    const namaFile = rows[0].gambar;
    if (namaFile) {
      // Hapus gambar jika ada
      const pathFile = path.join(
        __dirname,
        "../public/images/upload",
        namaFile
      );
      fs.unlinkSync(pathFile);
    }

    // Hapus entri dari database
    await Model_lab.Delete(id);

    req.flash("success", "Berhasil menghapus data");
    res.redirect("/lab");
  } catch (error) {
    console.error(error);
    req.flash("error", "Gagal menghapus data");
    res.redirect("/lab");
  }
});

module.exports = router;
