const mongoose = require("mongoose");
const user = mongoose.model("user");
const authService = require("../../service/authentication/authenticationService");
var moment = require('moment');

const loginView = (req, res, next) => {
    res.render("./front-end/login")
}

const registerView = (req, res, next) => {
    res.render("./front-end/login")
}

const loginPost = async (req, res, next) => {
    var username = authService.Sanitizing(req.body.username);
    var password = authService.Sanitizing(req.body.password);
    var user = await authService.findUserByUserNameOrEmail(username);
    if (!user) return res.status(201).json({ success: false, message: 'Username is not exits' });
    const isPasswordValid = await authService.comparePassword(password, user.password);
    if (!isPasswordValid) return res.status(201).json({ success: false, message: 'Password is not correct' });
    data = { _id: user._id, role: user.role }
    var token = authService.generateToken(data);
    if (user.role == 'admin') {
        return res.status(201).json({
            role: 'admin',
            token: token,
            username: user.username,
            success: true,
            message: ""
        })
    } else {
        return res.status(201).json({
            role: 'customer',
            token: token,
            username: user.username,
            success: true,
            message: ""
        })
    }
}

// router register user
const registerPost = async (req, res, next) => {
    var email = authService.Sanitizing(req.body.email);
    var username = authService.Sanitizing(req.body.username);
    var User = new user();
    let usernameFound = await user.count({ $or: [{ username: username }, { email: username }] })
    let emailFound = await user.count({ email: email })
    if (usernameFound !== 0) return res.json("username already exits");
    if (emailFound !== 0) return res.json("email already exits");

    const hashPassword = authService.hashPassword(req.body.password)
    let timeCreate = moment().format("YYYY/MM/DD HH:mm:ss");
    User.username = username
    User.password = hashPassword;
    User.email = email;
    User.timeCreate = timeCreate;
    User.role = 'customer';

    User.save()
        .then((user) => {
            return res.json("success")
        })
        .catch((error) => {
            res.json('error')
        });

}



module.exports = {
    loginView, registerView,
    loginPost,registerPost
}