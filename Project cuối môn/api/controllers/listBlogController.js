const listBlogModel = require("../models/listBlog")

exports.getAllBlog = async (req, res) => {
    try {
        const data = await listBlogModel.find();

        if (!data) {
            return res.status(400).json("Error");
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
};


exports.createBlog = async (req, res) => {
    try {
        console.log(req.body);
        const data = await listBlogModel.create({
            title: req.body.title,
            content: req.body.content,
            tag:req.body.tag
        })

        if(!data) {
            return res.status(400).json("Error")
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}


exports.updateBlog = async (req, res) => {
    try {
        console.log(req.body);
        const blogId = req.params.id;
        const data = await listBlogModel.findOneAndUpdate({ _id: blogId }, {
            title: req.body.title,
            content: req.body.content,
            tag:req.body.tag
        });

        if (!data) {
            return res.status(400).json("Error");
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
};


exports.deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const data = await listBlogModel.deleteOne({ _id: blogId });

        if (!data) {
            return res.status(400).json("Error");
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
};