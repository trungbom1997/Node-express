const express = require('express');
const router = express.Router();
const{homePageView,statusPost,getAllPost} = require("../../controller/front-end/userController")

router.get('/', homePageView);

router.post('/post-status',upload.single("file"), statusPost);

router.get("/timeline", getAllPost);

module.exports = router