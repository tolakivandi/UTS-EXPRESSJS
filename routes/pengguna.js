var express = require('express');
const model_users = require('../Model/model_pengguna');
const Model_pengguna = require('../Model/model_pengguna');
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    let id = req.session.userId;
    let Data = await Model_pengguna.getId(id);
    if (Data.length > 0) {
      if (Data[0].level_users != 2) {
        res.redirect('/login')
      } else {
        res.render('users/index', {
          title: 'user home',
          email: Data[0].email
        });
      }
    } else {
      res.status(401).json({ error: 'user tidak ada' });
    }
  } catch (error) {
    res.status(501).json('butuh akses login');
  }
});

module.exports = router;