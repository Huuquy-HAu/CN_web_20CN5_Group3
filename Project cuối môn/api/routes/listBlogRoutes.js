const express = require('express');
const { createBlog, updateBlog, deleteBlog, getAllBlog } = require('../controllers/listBlogController');
var router = express.Router();

router.get("/", getAllBlog);

router.put('/',createBlog);

router.patch('/:id', updateBlog )

router.delete('/:id', deleteBlog)

module.exports = router