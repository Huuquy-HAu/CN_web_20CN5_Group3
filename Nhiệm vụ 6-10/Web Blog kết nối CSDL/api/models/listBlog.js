const mongoose = require("../config/mongoose");

const listBlog = new mongoose.Schema({
    title: String,
    content: String,
    tag:String,
});

const listBlogModel = mongoose.model("listBlog", listBlog);

module.exports = listBlogModel;
