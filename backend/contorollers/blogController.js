const Blogs = require('../models/blogModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const ApiFeatures = require('../utils/apiFeatures');

// ***********   Get All Blogs   **********
exports.getAllBlogs = catchAsyncError(async (req, res, next) => {
    // const blogs = await Blogs.find();
    const numOfBlogs = await Blogs.countDocuments();
    const categories = await Blogs.find().distinct("category");

    const apiFeatures = new ApiFeatures(Blogs.find(), req.query).search()
    const blogs = await apiFeatures.query;

    res.json({
        success: true,
        numOfBlogs,
        categories,
        blogs,
    });
});

// ***********   Get Single Blog   **********   
exports.getSingleBlogs = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    console.log(id)
    const blog = await Blogs.findById(id);

    if (!blog) { return next(new ErrorHandler(500, "blog not found")) }

    res.json({
        success: true,
        blog
    });

});


// ***********   Create Blog -- Admin   **********
exports.createBlog = catchAsyncError(async (req, res, next) => {
    const blog = await Blogs.create(req.body);

    res.json({
        success: true,
        blog
    })
});

// ***********    Update Blog -- Admin   **********
exports.updateBlog = catchAsyncError(async (req, res, next) => {
    const blog = await Blogs.findById(req.params.id);

    if (!blog) {
        return res.status(500).json({
            success: false,
            message: "blog not found"
        })
    }

    await Blogs.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        useValidators: true,
        usefindAndModify: false,
    })
    res.status(200).json({
        success: true,
        message: "blog updated"
    })
});

// ***********   deleted Blog -- Admin   **********
exports.deleteBlog = catchAsyncError(async (req, res, next) => {
    const blog = await Blogs.findById(req.params.id);

    if (!blog) {
        return res.status(500).json({
            success: false,
            message: "blog not found"
        })
    }

    await blog.remove()
    res.status(200).json({
        success: true,
        message: "blog deleted"
    })
});




// module.exports = { getAllBlogs, createBlog } // we can also export controller function like this