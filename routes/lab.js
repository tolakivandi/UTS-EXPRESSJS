var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const Model_lab = require("../Model/model_lab.js");
const Model_user = require("../Model/model_pengguna.js");

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
  let user = await Model_user.getId(req.session.userId)
  res.render("admin/lab/index", {
    data: rows,
    title: 'Express',
    nama: user[0].nama_pengguna,
    role: user[0].role
  });
});

router.get("/create", async function (req, res, next) {
  let rows = await Model_lab.getAll();
  let user = await Model_user.getId(req.session.userId)
  res.render("admin/lab/create", {
    data: rows,
    nama: user[0].nama_pengguna,
    role: user[0].role
  });
});

router.post("/store", upload.single("gambar"), async function (req, res, next) {
  try {
    let { nama_lab, lokasi, tersedia } = req.body;
    let Data = {
      nama_lab,
      lokasi,
      tersedia,
      gambar: req.file ? req.file.filename : null,
      nama: user[0].nama_pengguna,
      role: user[0].role
    };

    await Model_lab.Store(Data);
    req.flash("success", "Berhasil menyimpan data"); // Perbaiki kunci flash message menjadi "success"
    res.redirect("/lab");
  } catch (error) {
    console.error(error); // Cetak error untuk debugging
    req.flash("error", "Gagal menyimpan data: " + error.message); // Sertakan pesan error dalam flash message
    res.redirect("/lab");
  }
});

router.get("/edit/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let rows = await Model_lab.getById(id);
    let user = await Model_user.getId(req.session.userId)
    res.render("admin/lab/edit", {
      data: rows[0], 
      nama: user[0].nama_pengguna,
      role: user[0].role
    });
  } catch (error) {
    res.redirect("/lab");
    console.error(error);
  }
});


router.post(
  "/update/:id", 
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

      await Model_lab.Update(id, Data); 
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
