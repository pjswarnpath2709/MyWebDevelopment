const bcrypt = require("bcrypt");
const User = require("../models/user");
const Post = require("../models/post");
const jwt = require("jsonwebtoken");
const { clearImage } = require("../utils/file");
const validator = require("validator").default;
module.exports = {
  createUser: async ({ userInput }, req) => {
    try {
      const { email, password, name } = userInput;
      const errors = [];
      if (!validator.isEmail(email)) {
        errors.push({ message: "Email is invalid." });
      }
      if (
        !validator.isEmpty(password) &&
        !validator.isLength(password, { min: 5 })
      ) {
        errors.push({ message: "password to short!" });
      }

      if (errors.length > 0) {
        const error = new Error("Invalid Input");
        error.data = errors;
        error.code;
        throw error;
      }
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        const error = new Error("user Exists already!");
        throw error;
      }
      const hashedPw = await bcrypt.hash(password, 12);
      const userObj = new User({
        email: email,
        name: name,
        password: hashedPw,
      });
      const createdUser = await userObj.save();
      return { ...createdUser._doc, _id: createdUser._id.toString() };
    } catch (err) {
      console.log("\x1b[33m", "😤😫🤯 :", err);
      throw err;
    }
  },
  login: async ({ email, password }, req) => {
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not found!");
      error.code = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Password is being incorrect");
      error.code = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      "secret",
      {
        expiresIn: "1h",
      }
    );

    return { token, userId: user._id.toString() };
  },
  createPost: async ({ postInput }, req) => {
    if (!req.isAuth) {
      const error = new Error("Not Authenticated");
      error.code = 401;
      throw error;
    }
    const { title, content, imageUrl } = postInput;
    const errors = [];
    if (!validator.isEmpty(title) && !validator.isLength(title, { min: 3 })) {
      errors.push({ message: "title is invalid." });
    }
    if (
      !validator.isEmpty(content) &&
      !validator.isLength(content, { min: 3 })
    ) {
      errors.push({ message: "content is invalid." });
    }

    if (errors.length > 0) {
      const error = new Error("Invalid Input");
      error.data = errors;
      error.code;
      throw error;
    }
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("Invalid user");
      error.code = 401;
      throw error;
    }
    const post = new Post({
      title,
      content,
      creator: user,
      imageUrl,
    });
    const createdPost = await post.save();

    user.posts.push(createdPost);
    await user.save();

    return {
      ...createdPost._doc,
      _id: createdPost._id.toString(),
      createdAt: createdPost.createdAt.toISOString(),
      updatedAt: createdPost.updatedAt.toISOString(),
    };
  },
  posts: async ({ page }, req) => {
    if (!req.isAuth) {
      const error = new Error("Not Authenticated");
      error.code = 401;
      throw error;
    }
    if (!page) {
      page = 1;
    }
    const PER_PAGE = 2;
    const totalPosts = await Post.find().countDocuments();
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * PER_PAGE)
      .limit(PER_PAGE)
      .populate("creator");

    const postsArray = posts.map((post) => {
      return {
        ...post._doc,
        _id: post._id.toString(),
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
      };
    });
    return {
      posts: [...postsArray],
      totalPosts,
    };
  },
  post: async ({ postId }, req) => {
    if (!req.isAuth) {
      const error = new Error("Not Authenticated");
      error.code = 401;
      throw error;
    }

    const post = await Post.findById(postId).populate("creator");
    if (!post) {
      const error = new Error("No post found!");
      error.code = 404;
      throw new error();
    }

    return {
      ...post._doc,
      _id: post._id.toString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    };
  },
  updatePost: async ({ postId, postInput }, req) => {
    if (!req.isAuth) {
      const error = new Error("Not Authenticated");
      error.code = 401;
      throw error;
    }
    const post = await Post.findById(postId).populate("creator");

    if (!post) {
      const error = new Error("No post found!");
      error.code = 404;
      throw new error();
    }

    if (post.creator._id.toString() !== req.userId.toString()) {
      const error = new Error("Not Authorized!");
      error.code = 403;
      throw new error();
    }

    const { title, content, imageUrl } = postInput;

    const errors = [];
    if (!validator.isEmpty(title) && !validator.isLength(title, { min: 3 })) {
      errors.push({ message: "title is invalid." });
    }
    if (
      !validator.isEmpty(content) &&
      !validator.isLength(content, { min: 3 })
    ) {
      errors.push({ message: "content is invalid." });
    }

    if (errors.length > 0) {
      const error = new Error("Invalid Input");
      error.data = errors;
      error.code;
      throw error;
    }

    post.title = title;
    post.content = content;
    if (post.imageUrl !== "undefined") {
      post.imageUrl = imageUrl;
    }

    const updatedPost = await post.save();

    return {
      ...updatedPost._doc,
      _id: updatedPost._id.toString(),
      createdAt: updatedPost.createdAt.toISOString(),
      updatedAt: updatedPost.updatedAt.toISOString(),
    };
  },
  deletePost: async ({ postId }, req) => {
    if (!req.isAuth) {
      const error = new Error("Not Authenticated");
      error.code = 401;
      throw error;
    }

    const post = await Post.findById(postId);

    if (!post) {
      const error = new Error("No post found!");
      error.code = 404;
      throw new error();
    }

    if (post.creator.toString() !== req.userId.toString()) {
      const error = new Error("Not Authorized!");
      error.code = 403;
      throw new error();
    }

    clearImage(post.imageUrl);

    await Post.findByIdAndRemove(postId);

    const user = await User.findById(req.userId);
    user.posts.pull(postId);
    await user.save();

    return true;
  },

  user: async (args, req) => {
    if (!req.isAuth) {
      const error = new Error("Not Authenticated");
      error.code = 401;
      throw error;
    }

    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("no user found!");
      error.code = 404;
      throw error;
    }

    return {
      ...user._doc,
      _id: user._id.toString(),
    };
  },

  updateStatus: async ({ status }, req) => {
    if (!req.isAuth) {
      const error = new Error("Not Authenticated");
      error.code = 401;
      throw error;
    }

    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("no user found!");
      error.code = 404;
      throw error;
    }

    user.status = status;
    const updatedUser = await user.save();
    return {
      ...updatedUser._doc,
      _id: updatedUser._id.toString(),
    };
  },
};
