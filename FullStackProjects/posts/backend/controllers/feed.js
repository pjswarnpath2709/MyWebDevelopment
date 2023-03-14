const {
  throwError,
  errorMessages,
  setDefaultStatus,
} = require("../utils/errors");
const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    const totalItems = posts.length;
    if (!posts) {
      throw throwError(errorMessages.PostsNotFound);
    }
    return res.status(200).json({
      message: "fetched posts",
      posts: posts,
      totalItems: totalItems,
    });
  } catch (err) {
    setDefaultStatus(err);
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      throw throwError(errorMessages.PostNotFound);
    }
    return res.status(200).json({
      message: "post fetched!",
      post: post._doc,
    });
  } catch (err) {
    setDefaultStatus(err);
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    if (req.loginType === "user") {
      const { title, content, imageUrl, creator } = req.body;

      if (creator.toString() !== req.userId.toString()) {
        throw throwError(errorMessages.Unauthorized);
      }
      const post = await new Post({
        title,
        content,
        imageUrl,
        creator,
      }).save();

      // storing the posts with the User
      const user = await User.findById(req.userId);
      user.posts.push(post);
      await user.save();

      return res.status(201).json({
        message: "post created successfully",
        post: post._doc,
      });
    }
  } catch (err) {
    setDefaultStatus(err);
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  const { postId } = req.params;
  const { title, imageUrl, content } = req.body;

  try {
    if (req.loginType === "user") {
      const post = await Post.findById(postId);

      if (!post) {
        throw throwError(errorMessages.PostNotFound);
      }

      post.title = title;
      if (post.imageUrl !== imageUrl) {
        require("../utils/clearImage")(post.imageUrl);
        post.imageUrl = imageUrl;
      }

      post.content = content;
      await post.save();

      return res.status(200).json({
        message: "post updated!",
        post: post._doc,
      });
    }
  } catch (err) {
    setDefaultStatus(err);
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      throw throwError(errorMessages.PostNotFound);
    }

    if (req.loginType === "user") {
      // if the user is not same as that of the creator
      if (req.userId.toString() != post.creator._id.toString()) {
        throw throwError(errorMessages.Unauthorized);
      }
    }

    // clear the image 
    require("../utils/clearImage")(post.imageUrl);

    post.comments.forEach(async (comment) => {
      try {
        console.log("\x1b[35m", "👉👉👉 comment :", comment);
        await Comment.findByIdAndRemove(comment._id);
      } catch (err) {
        throw err;
      }
    });

    await post.deleteOne();

    return res.status(200).json({
      message: "post deleted successfully",
      postId: post._id.toString(),
    });
  } catch (err) {
    setDefaultStatus(err);
    next(err);
  }
};

exports.updateLike = async (req, res, next) => {
  const { postId } = req.params;
  let { like } = req.query;
  like = JSON.parse(like);
  try {
    const post = await Post.findById(postId);

    if (!post) {
      throw throwError(errorMessages.PostNotFound);
    }

    if (req.loginType === "user") {
      if (
        like &&
        !post.likes.find((id) => id.toString() === req.userId.toString())
      ) {
        // when the post is liked but the userID is not already present
        post.likes.push(req.userId);
      } else if (
        !like &&
        post.likes.find((id) => id.toString() === req.userId.toString())
      ) {
        // when the post is dis-liked but the userId is already present
        post.likes.pull(req.userId);
      } else {
        return res.status(403).json({
          message: "like already updated with given value",
        });
      }
      // save the post
      await post.save();

      return res.status(200).json({
        message: "like updated",
        likesCount: post.likes.length,
      });
    }
  } catch (err) {
    setDefaultStatus(err);
    next(err);
  }
};

exports.postComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { comment } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      throw throwError(errorMessages.PostNotFound);
    }
    if (req.loginType === "user") {
      const commentObj = new Comment({
        userId: req.userId,
        postId: postId,
        comment: comment,
      });

      // create a comment
      await commentObj.save();

      post.comments.push(commentObj);

      // save the post
      await post.save();

      return res.status(200).json({
        message: "comment posted!!",
        comment: commentObj._id.toString(),
      });
    }
  } catch (err) {
    setDefaultStatus(err);
    next(err);
  }
};

exports.updateComment = async (req, res, next) => {
  const { commentId } = req.params;
  const { comment } = req.body;
  try {
    const commentObj = await Comment.findById(commentId);
    if (!commentObj) {
      throw throwError(errorMessages.CommentNotFound);
    }
    if (req.loginType === "user") {
      if (req.userId.toString() != commentObj.userId.toString()) {
        throw throwError(errorMessages.Unauthorized);
      }
    }
    commentObj.comment = comment;
    await commentObj.save();
    return res.status(200).json({
      message: "comment updated!",
      commentId: commentId.toString(),
    });
  } catch (err) {
    setDefaultStatus(err);
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  const { commentId } = req.params;
  try {
    const commentObj = await Comment.findById(commentId);
    if (!commentObj) {
      throw throwError(errorMessages.CommentNotFound);
    }
    if (req.loginType === "user") {
      // if the user is not same as that of the creator
      if (req.userId.toString() != commentObj.userId.toString()) {
        throw throwError(errorMessages.Unauthorized);
      }
    }
    // get the post
    const post = await Post.findById(commentObj.postId);

    // remove the comment from the post
    post.comments.pull(commentObj);
    await post.save();

    await Comment.findByIdAndRemove(commentId);

    return res.status(200).json({
      message: "comment deleted!!",
      commentId: commentId.toString(),
    });
  } catch (err) {
    setDefaultStatus(err);
    next(err);
  }
};
