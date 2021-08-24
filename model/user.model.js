const mongoose = require("mongoose");
var user = new mongoose.Schema({
  username: {type: String},
  password: {type: String},
  email: {type: String},
  firstname: {type: String},
  profilePicture: {type: String,default:""},
  coverPicture: {type: String,default:""},
  followers: { type:Array,default:[] },
  followings: { type:Array,default:[] },
  role: {type: String},
  timeCreate: {type: String},
});
mongoose.model("user", user);