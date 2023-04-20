const router = require("express").Router();

const auth = require("./auth.routers");
const posts = require("./posts.routers");

router.use(auth, posts);

module.exports = router;
