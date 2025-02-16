const express = require("express");
const { getPopularPosts, getPopularPostsByBoard, increaseViewCount, getPostsByCategory } = require("../controllers/communityController");

const router = express.Router();

router.get("/popular", getPopularPosts);
router.get("/popular/:boardId", getPopularPostsByBoard);
router.put("/view/:postId", increaseViewCount);
router.get("/category/:category", getPostsByCategory);

module.exports = router;
