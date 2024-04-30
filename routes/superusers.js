const model_pengguna = require('../Model/model_pengguna');
var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
    try {
        let id = req.session.userId;
        let Data = await model_pengguna.getId(id);
        if (Data.length > 0) {
            if (Data[0].role != "admin") {
                res.render('superusers/index', {
                    title: 'user home',
                    email: Data[0].email
                });
            } else {
                res.render('superusers/index', {
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