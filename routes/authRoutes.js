const express = require('express');
const router = express.Router();
const guest = require('../middlewares/guest');
const authController = require('../controllers/authController');

router.get('/register', authController.getRegister);

router.post('/register', authController.postRegister);

router.get('/login', guest, authController.getLogin);

router.post('/login', guest, authController.postLogin);

router.get('/logout', authController.logout);

module.exports = router;