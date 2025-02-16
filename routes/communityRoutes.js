const express = require("express");
const { getPopularPosts, getPopularPostsByBoard, increaseViewCount } = require("../controllers/communityController");

const router = express.Router();

// 🔹 전체 인기글 조회
router.get("/popular", getPopularPosts);

// 🔹 특정 게시판의 인기글 조회
router.get("/popular/:boardId", getPopularPostsByBoard);

// 🔹 조회수 증가 API
router.put("/view/:postId", increaseViewCount);

router.get("/category/:category", getPostsByCategory);

module.exports = router;
