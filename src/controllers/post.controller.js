const postModel = require("../models/post.model")
const generateCaption = require("../services/ai.service.js")
const uploadFile = require("../services/storage.service.js")
const {v4: uuidV4 }= require('uuid')

async function createPostController(req,res){
    const file = req.file;
    console.log("File received", file)

    const base64Image = new Buffer.from(file.buffer).toString('base64')

    const caption = await generateCaption(base64Image)
    const result = await uploadFile(file.buffer, file.originalname)

    const post = await postModel.create({
        caption: caption,
        image: result.url,
        user: req.user._id
    })
    res.status(201).json({
        message: "Post created successfully",
        post
    })
}
module.exports = {
    createPostController
}