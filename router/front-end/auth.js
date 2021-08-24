const express = require('express');
const router = express.Router();
const{loginView,registerView,loginPost,registerPost} = require("../../controller/front-end/authController")

router.get('/login', loginView);

router.get('/register', registerView);

router.post('/login-post', loginPost);

router.post('/register-post', registerPost);


module.exports = router