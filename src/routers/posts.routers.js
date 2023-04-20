const router = require("express").Router();
const { post, allPosts } = require("../controllers/posts.controller");
router.post("/posts", post);
router.get("/posts", allPosts);

module.exports = router;
