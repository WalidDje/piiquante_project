//Imports
const express = require('express');
const router = express.Router();
//Controllers
const sauceCtrl = require('../controllers/sauce');
//Middlewares
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

//Router Logic, calling each functions
router.post('/', auth, multer, sauceCtrl.createProduct);
router.post('/:id/like', auth, sauceCtrl.likeProduct);
router.get('/', auth, sauceCtrl.getProductAll);
router.get('/:id', auth, sauceCtrl.getProduct);
router.put('/:id', auth, multer, sauceCtrl.modifyProduct);
router.delete('/:id', auth, sauceCtrl.deleteProduct);

//Router Export
module.exports = router;
