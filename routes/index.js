var express = require('express');
const Model_pengguna = require('../Model/model_pengguna');
var router = express.Router();
var bcrypt = require("bcrypt")
const Model_user = require("../Model/model_pengguna.js");

/* GET home page. */
router.get('/', async function(req, res, next) {
  let user = await Model_user.getId(req.session.userId)
  res.render('admin/dashboard', { 
    title: 'Express',
    nama: user[0].nama_pengguna,
    role: user[0].role
  });
});

router.get('/register', function(req, res, next){
  res.render('auth/register');
});

router.get('/login', function(req, res, next){
  res.render('auth/login');
})

router.post('/saveusers', async(req, res) => {
  let {email, kata_sandi, nama_pengguna} = req.body;
  let enkripsi = await bcrypt.hash(kata_sandi, 10);
  let Data = {
    nama_pengguna,
    email,
    kata_sandi : enkripsi
  };
  await Model_pengguna.Store(Data);
  req.flash('success', 'berhasil login');
  res.redirect('/login')
});

router.post('/log', async (req, res) =>{
  let {email, kata_sandi } = req.body;
  let Data = await Model_pengguna.login(email);
  try{
    if (Data.length > 0){
      let enkripsi = Data[0].kata_sandi;
      let cek = await bcrypt.compare(kata_sandi, enkripsi);
      if (cek){
        req.session.userId = Data[0].id_pengguna;
        if(Data[0].role == "admin"){
          req.flash('success', 'berhasil login');
        res.redirect('/');
        }else if(Data[0].role == "mahasiswa"){
          req.flash('success', 'berhasil login');
          res.redirect('/mahasiswa');
        } else{
          res.redirect('/login');
        }
      }else{
        // res.send("error");
        req.flash('success','berhasil login');
        res.redirect('/login');
      }
    }else{
      // res.send("gagal");
      req.flash('success','akun tidak ditemukan');
      res.redirect('/login');
    }
  }catch (err){
    // res.send(err);
    console.log(err)
    console.log(Data[0].kata_sandi)
    console.log(kata_sandi)
    req.flash('error','error pada fungsi');
    res.redirect("/login")
  }
});

router.get ('/logout', function(req, res){
  req.session.destroy(function(err){
    if(err){
      console.error(err);
    }else {
      res.redirect('login');
    }
  })
})


module.exports = router;