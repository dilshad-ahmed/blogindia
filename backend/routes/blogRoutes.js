const express = require('express');
const { getAllBlogs, createBlog, getSingleBlogs, updateBlog, deleteBlog } = require('../contorollers/blogController');
const router = express.Router();

router.route('/blogs').get(getAllBlogs);
router.route('/blog/new').post(createBlog);
router.route('/blog/:id').get(getSingleBlogs).put(updateBlog).delete(deleteBlog)

module.exports = router;