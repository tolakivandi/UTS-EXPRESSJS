var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const model_peminjaman = require('../Model/model_peminjaman.js');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/upload')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage: storage})


router.get("/",async function (req, res, next) {
    let rows = await model_peminjaman.getAll();
    res.render("admin/peminjaman/index", {
      data: rows,
    });
  });



router.get('/create', async function(req, res, next){
    let rows = await model_peminjaman.getAll();
   res.render('admin/peminjaman/create',{
    data: rows,
   })
})


router.post('/store',upload.single("gambar"),  async function(req,res,next){
    try{
        let {nama_lab,lokasi, tersedia} = req.body;
        let Data ={
            nama_lab,
            lokasi,
            tersedia,
            gambar: req.file.filename
        }
        await model_peminjaman.Store(Data);
        req.flash('succes','Berhasil menyimpan data');
        res.redirect('/lab')
    }catch{
        req.flash('error','gagal menyimpan data');
        res.redirect('/lab')
    }
})
 
router.get('/edit/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let rows = await model_peminjaman.getId(id);
        res.render('lab/edit', {
            data: rows,
            id: rows[0].id_movie,
            nama_lab: rows[0].nama_lab,
            lokasi: rows[0].lokasi,
            tersedia: rows[0].tersedia,
            gambar: rows[0].gambar,
        });
    } catch (error) {
        res.redirect('/lab');
        console.error(error);
    }
});


router.post('/update/(:id)', upload.single("gambar"), async function(req,res,next){
    let id = req.params.id;
    let filebaru = req.file ? req.file.filename : null;
    let rows = await model_peminjaman.getId(id);
    const namaFileLama = rows[0].gambar;
    
    if(filebaru && namaFileLama){
        const pathFileLama = path.join(__dirname, '../public/images/upload', namaFileLama);
        fs.unlinkSync(pathFileLama);
    }
        let {nama_lab, lokasi,tersedia} = req.body;
        let gambar = filebaru || namaFileLama;
        let Data = {
            nama_lab,
            lokasi,
            tersedia,
            gambar,
        }
        model_peminjaman.Update(id,Data);
        req.flash('success','Berhasil update data');
        res.redirect('/lab')
    })


router.get('/delete/(:id)',async function(req,res,next){
    let id = req.params.id;
    let rows = await model_peminjaman.getId(id);
    const namaFileLama = rows[0].gambar;
    if(namaFileLama){
        const pathFileLama = path.join(__dirname, '../public/images/upload', namaFileLama);
        fs.unlinkSync(pathFileLama);
    }
    await model_peminjaman.Delete(id);
    req.flash('success','Berhasil menghapus data');
    res.redirect('/lab')
})

module.exports = router;