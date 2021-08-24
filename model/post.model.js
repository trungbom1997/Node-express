const mongoose = require("mongoose");
var post = new mongoose.Schema({
    userId: { type: String },
    desc: { type: String },
    img: { type: String },
    likes: { type: Array, default: [] },
}, { timestamps: true });
mongoose.model("post", post);