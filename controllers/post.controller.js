import PostModel from "../models/post.model.js";
export const createPost = async (req, res) => {
    const { title, content, author } = req.body;
    if (!title || !content || author) {
        return res.status(400).json({ error: "Title, content, and author are required." });
    }
    try {
        const post = new PostModel({ title, content, author });
        await post.save();
        return res.status(201).json(post);
    } catch (error) {
        return res.status(500).json({ error: error.message || "Internal server error" });
    }
};

export const getAllPost = async (req, res) => {
    try {
        const posts = await PostModel.find({});
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ error: error.message || "Internal server error" });
    }
};