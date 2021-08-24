const express = require('express');
const router = express.Router();
const{homePageView,statusPost,getAllPost,getUserById,getAllPostById} = require("../../controller/front-end/homePageController")
const {upload} = require("../../middleware")

router.get('/', homePageView);

router.post('/post-status',upload.single("file"), statusPost);

router.get("/all-post", getAllPost);

router.get("/time-line/:userId", getUserById);

router.post("/all-post-user/:userId", getAllPostById);




module.exports = router