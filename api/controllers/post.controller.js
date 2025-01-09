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
    console.log(error);
    return res.status(500).json({ message: "Error creating post" });
  }
};

export const getposts = async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;

    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { userId: req.query.category }),
      ...(req.query.slug && { userId: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthPosts = await Post.countDocuments({
      createdAt:{$gte: oneMonthAgo}
    })

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts
    })
   
  } catch (error) {
    console.log(error.message);
    
  }
};
