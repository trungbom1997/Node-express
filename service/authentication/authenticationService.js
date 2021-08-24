const mongoose = require("mongoose");
const user = mongoose.model("user");
var jwt = require('jsonwebtoken');
var xss = require("xss");
const bcrypt = require('bcrypt');
const SALT_ROUND = 8;
const ACCESS_TOKEN = 'accessToken'

function Sanitizing(htmlString) {
    try {
        var stripedHtml = htmlString.replace(/<[^>]+>/g, '');
        return xss(stripedHtml);
    } catch (error) {
        return ''
    }
    
}

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(SALT_ROUND);
    return hashNewPassword = bcrypt.hashSync(Sanitizing(password), salt);
}

async function comparePassword(password, passwordCompare) {
    return isPasswordValid = await bcrypt.compareSync(password, passwordCompare);
}

async function findUserByUserNameOrEmail(username) {
    const result = await user.findOne({
        $or: [{ username: username }, { email: username }]
    }, (err, docs) => {
        if (!err) return docs;
        return false;
    })
    return result;
}

async function findUserByEmail(email) {
    const result = await user.findOne({ email: email }
        ,(err, docs) => {
            if (!err) return docs;
            return false;
        })
    return result;
}

async function updatePasswordUser(id,newPassword){
    const result =await user.updateOne({ _id: id }, {
        $set: { password: newPassword },
    },(err, docs) => {
        if (!err) return docs;
        return false;
    })
    return result;
}

function generateToken(data, expires) {
    expiresIn = expires || '9999years';
    const token = jwt.sign(data, ACCESS_TOKEN, { expiresIn: expiresIn });
    return token;
}

function verifyToken(token){
    try {
        const result = jwt.verify(token, ACCESS_TOKEN, (err, payload) => {
            if (err)  return false;
            return payload;
        })
        return result;
    } catch (error) {
        return false;
    }
}


module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken,
    findUserByEmail: findUserByEmail,
    findUserByUserNameOrEmail: findUserByUserNameOrEmail,
    hashPassword: hashPassword,
    comparePassword: comparePassword,
    Sanitizing:Sanitizing,
    updatePasswordUser: updatePasswordUser,
}