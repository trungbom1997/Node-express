const mongoose = require("mongoose");
const post = mongoose.model("post");
const user = mongoose.model("user");
const authService = require("../../service/authentication/authenticationService");
var moment = require('moment');
const homePageView = (req, res, next) => {
    res.render("./front-end/homePage")
}

const statusPost = async (req, res, next) => {
    var desc = authService.Sanitizing(req.body.desc);
    var image = req.file.filename;
    var token = req.cookies.token;
    const tokenVerify = authService.verifyToken(token);
    if (tokenVerify) {
        var userId = tokenVerify._id
    }
    var Post = new post();

    Post.userId = userId
    Post.desc = desc;
    Post.img = image;

    Post.save()
        .then((post) => {
            return res.json("success")
        })
        .catch((error) => {
            res.json('error')
        });
}

const getAllPost = async (req, res, next) => {
    try {
        const tokenVerify = authService.verifyToken(req.cookies.token);
        const currentUser = await user.findById(tokenVerify._id);
        const userPosts = await post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ $and: [{ userId: friendId }, { createdAt: { $lte: moment().subtract(2, "days") } }] },);
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts));
    } catch (err) {
        res.status(500).json(err);
    }
}

const getUserById = async (req, res, next) => {
    try {
        const User = await user.findById(req.params.userId);
        const { password, updatedAt, ...other } = User._doc;
        res.status(200).json(other)
    } catch (error) {
        res.status(500).json(error);
    }
}

const getAllPostById = async (req, res, next) => {
    try {
        const Post = await post.find({userId:req.params.userId});
        res.status(200).json(Post)
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    homePageView, statusPost, getAllPost, getUserById,getAllPostById
}