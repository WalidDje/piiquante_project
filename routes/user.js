//Imports
const express = require('express');
const router = express.Router();
//Controllers
const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');

//Router Logical (on appelle pas la fonction, on l'applique seulement donc pas de ())
router.post('/signup', userCtrl.signUp);
router.post('/login', userCtrl.login);
//Router Export
module.exports = router;
