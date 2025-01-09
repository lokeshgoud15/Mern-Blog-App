import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
  if (!req.user.isAdmin) {
    return res
      .status(401)
      .json({ message: "You are not allowed to create a post." });
  }
  if (!req.body.title || !req.body.content) {
    return res
      .status(400)
      .json({ message: "Please provide a title and content for thepost" });
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.userId,
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json({ message: "Post created successfully", savedPost });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Error creating post" });
  }
};
