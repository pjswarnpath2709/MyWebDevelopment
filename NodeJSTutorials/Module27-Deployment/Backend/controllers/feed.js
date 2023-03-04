const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator/check");
const io = require("../socket");
const Post = require("../models/post");
const User = require("../models/user");
exports.getPosts = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalItems;
  try {
    totalItems = await Post.find().countDocuments();
    const posts = await Post.find()
      .populate("creator")
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    if (!posts) {
      throw new Error("no posts found");
    }
    res.status(200).json({
      message: "fetched posts",
      posts: posts,
      totalItems: totalItems,
    });
  } catch (err) {
    err.statusCode = err.statusCode ? err.statusCode : 500;
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed , entered data is incorrect");
      error.statusCode = 422;
      throw error;
    }

    if (!req.file) {
      const error = new Error("no image provided");
      error.statusCode = 422;
      throw error;
    }

    const title = req.body.title;
    const content = req.body.content;
    const imageUrl = req.file.path;
    let creator;
    const post = new Post({
      title,
      content,
      creator: req.userId,
      imageUrl: imageUrl,
    });
    await post.save();

    const user = await User.findById(req.userId);

    user.posts.push(post);
    creator = user;
    await user.save();
    io.getIO().emit("posts", {
      action: "create",
      post: {
        ...post._doc,
        creator: {
          _id: req.userId,
          name: user.name,
        },
      },
    });
    res.status(201).json({
      message: "post created successfully",
      post: post,
      creator: {
        _id: creator._id,
        name: creator.name,
      },
    });
  } catch (err) {
    err.statusCode = err.statusCode ? err.statusCode : 500;
    next(err);
  }

  // create post in the database
  // 201 - success a resource was created
};

exports.getPost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      const error = new Error("Could not find post !!");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: "post fetched!",
      post: post,
    });
  } catch (err) {
    err.statusCode = err.statusCode ? err.statusCode : 500;
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed , entered data is incorrect");
      error.statusCode = 422;
      throw error;
    }
    const title = req.body.title;
    const content = req.body.content;
    let imageUrl = req.body.image;
    if (req.file) {
      imageUrl = req.file.path;
    }
    if (!imageUrl) {
      const err = new Error("No file Picked");
      err.statusCode = 422;
      throw err;
    }
    const post = await Post.findById(postId).populate("creator");

    if (!post) {
      const error = new Error("no post found");
      error.statusCode = 404;
      throw error;
    }
    if (post.creator._id.toString() !== req.userId.toString()) {
      const error = new Error("not authorized");
      error.statusCode = 403;
      throw error;
    }
    if (imageUrl != post.imageUrl) {
      require("./utils/file").clearImage(post.imageUrl);
    }
    post.title = title;
    post.content = content;
    post.imageUrl = imageUrl;
    const result = await post.save();

    io.getIO().emit("posts", {
      action: "update",
      post: result,
    });

    res.status(200).json({
      message: "Post Updated",
      post: result,
    });
  } catch (err) {
    err.statusCode = err.statusCode ? err.statusCode : 500;
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    if (!post) {
      const error = new Error("no post found");
      error.statusCode = 404;
      throw error;
    }

    if (post.creator.toString() !== req.userId.toString()) {
      const error = new Error("not authorized");
      error.statusCode = 403;
      throw error;
    }

    require("./utils/file").clearImage(post.imageUrl);

    await Post.findByIdAndRemove(postId);

    const user = await User.findById(req.userId);

    user.posts.pull(postId);
    await user.save();
    io.getIO().emit("posts", {
      action: "delete",
      post: postId,
    });

    res.status(200).json({
      message: "deleted Post",
    });
  } catch (err) {
    err.statusCode = err.statusCode ? err.statusCode : 500;
    next(err);
  }
};

