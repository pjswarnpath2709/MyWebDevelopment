const router = require("express").Router();

const isAuth = require("../middlewares/is-auth");
const isBlocked = require("../middlewares/is-blocked");

const feedControllers = require("../controllers/feed");

router.get("/posts", feedControllers.getPosts);

router.post("/post", [isAuth, isBlocked], feedControllers.createPost);

router.get("/post/:postId", [isAuth, isBlocked], feedControllers.getPost);

router.put("/post/:postId", [isAuth, isBlocked], feedControllers.updatePost);

router.delete("/post/:postId", [isAuth, isBlocked], feedControllers.deletePost);

router.put(
  "/likePost/:postId",
  [isAuth, isBlocked],
  feedControllers.updateLike
);

router.post(
  "/comment/:postId",
  [isAuth, isBlocked],
  feedControllers.postComment
);

router.put(
  "/comment/:commentId",
  [isAuth, isBlocked],
  feedControllers.updateComment
);

router.delete(
  "/comment/:commentId",
  [isAuth, isBlocked],
  feedControllers.deleteComment
);

module.exports = router;
