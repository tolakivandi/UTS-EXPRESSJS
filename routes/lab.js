var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const Model_lab = require('../model/model_lab.js');



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
    let rows = await Model_lab.getAll();
    res.render("admin/lab/index", {
      data: rows,
    });
  });


router.get('/create', async function(req, res, next){
    let rows = await Model_lab.getAll();
   res.render('admin/lab/create',{
    data: rows,
   })
})


router.post('/store',upload.single("gambar"),  async function(req,res,next){
    try{
        let {nama_lab,lokasi,tersedia} = req.body;
        let Data ={
            nama_lab,
            lokasi,
            tersedia,
            gambar: req.file.filename
        }

        await Model_lab.Store(Data);
        req.flash('succes','Berhasil menyimpan data');
        res.redirect('/lab')
    }catch(error){
        req.flash('error','gagal menyimpan data');
        res.redirect('/lab')
        console.error(error);


    }
})
 
router.get('/edit/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let rows = await Model_lab.getId(id);
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
    let rows = await Model_lab.getId(id);
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
        Model_lab.Update(id,Data);
        req.flash('success','Berhasil update data');
        res.redirect('/lab')
    })


router.get('/delete/(:id)',async function(req,res,next){
    let id = req.params.id;
    let rows = await Model_lab.getId(id);
    const namaFileLama = rows[0].gambar;
    if(namaFileLama){
        const pathFileLama = path.join(__dirname, '../public/images/upload', namaFileLama);
        fs.unlinkSync(pathFileLama);
    }
    await Model_lab.Delete(id);
    req.flash('success','Berhasil menghapus data');
    res.redirect('/lab')
})

module.exports = router;