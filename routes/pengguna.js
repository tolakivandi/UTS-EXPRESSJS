const express = require('express');
const Model_pengguna = require('../Model/model_pengguna');
const router = express.Router();

// Route untuk menampilkan halaman login
router.get('/login', function (req, res) {
  res.render('login', { title: 'Login' });
});

// Route untuk menangani login
router.post('/login', async function (req, res) {
  const { email, password } = req.body;
  try {
    // Periksa apakah pengguna ada dalam database
    const user = await Model_pengguna.getUserByEmail(email);
    if (user && user.kata_sandi === password) {
      // Simpan ID pengguna dalam sesi
      req.session.userId = user.id_pengguna;
      res.redirect('/users');
    } else {
      res.status(401).json({ error: 'Email atau kata sandi salah' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

// Route untuk menampilkan halaman register
router.get('/register', function (req, res) {
  res.render('register', { title: 'Register' });
});

// Route untuk menangani registrasi pengguna
router.post('/register', async function (req, res) {
  const { nama_pengguna, email, kata_sandi, role } = req.body;
  try {
    // Simpan pengguna baru ke dalam database
    const newUser = await Model_pengguna.createUser({ nama_pengguna, email, kata_sandi, role });
    // Jika berhasil, arahkan ke halaman login
    res.redirect('/login');
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

// Route untuk menampilkan halaman dashboard pengguna
router.get('/dashboard', async function (req, res) {
  try {
    // Periksa apakah ada ID pengguna yang tersimpan dalam sesi
    const userId = req.session.userId;
    if (!userId) {
      // Jika tidak ada, arahkan ke halaman login
      res.redirect('/login');
      return;
    }
    // Ambil data pengguna berdasarkan ID
    const user = await Model_pengguna.getUserById(userId);
    if (!user) {
      // Jika data pengguna tidak ditemukan, kirim respons dengan status 404 (Not Found)
      res.status(404).json({ error: 'Pengguna tidak ditemukan' });
      return;
    }
    // Tampilkan halaman dashboard pengguna
    res.render('dashboard', { title: 'Dashboard', user });
  } catch (error) {
    // Jika terjadi kesalahan, kirim respons dengan status 500 (Internal Server Error)
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

module.exports = router;
