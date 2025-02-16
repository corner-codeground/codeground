import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BoardTabs from "../component/BoardTabs";
import PostPreview from "./board_pages/PostPreview";
import "./Home.css";
import Button from "../component/Button";

const BASE_URL = process.env.REACT_APP_API_URL;

const Home = () => {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]); // ✅ 게시판 목록 상태 추가
  const [posts, setPosts] = useState([]); // ✅ 인기 게시글 상태

  useEffect(() => {
    // ✅ 1. 게시판 목록 조회 (GET /boards)
    const fetchBoards = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/boards`);
        if (response.data.success) {
          setBoards(response.data.data); // ✅ 게시판 목록 업데이트
        } else {
          console.error("게시판 목록 불러오기 실패:", response.data);
        }
      } catch (error) {
        console.error("게시판 목록 불러오는 중 오류 발생:", error);
      }
    };

    // ✅ 2. 인기 게시글 조회 (GET /posts/popular)
    const fetchPopularPosts = async () => {
      try {
        const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
        const token = localStorage.getItem("token"); // 🔥 저장된 토큰 가져오기

        const response = await axios.get(`${BASE_URL}/posts/popular`, {
          headers: {
            Authorization: `Bearer ${token}`, // 실제 JWT 토큰으로 변경
          },
        });

        console.log("✅ 인기 게시글 응답 데이터:", response.data);

        if (response.data.success) {
          setPosts(response.data.data);
        } else {
          console.error("Failed to fetch posts:", response.data);
        }
      } catch (error) {
        console.error("Error fetching popular posts:", error);
      }
    };

    fetchBoards(); // ✅ 게시판 목록 불러오기
    fetchPopularPosts(); // ✅ 인기 게시글 불러오기
  }, []);

  // 글쓰기 페이지로 이동
  const handleWriteClick = () => {
    navigate("/writting/:postId");
  };

  return (
    <div>
      {/* ✅ 게시판 목록을 props로 전달 */}
      <BoardTabs boards={boards} />

      <div className="explain-board">
        전체 인기글 <br />
        <div className="post-preview-container">
          {posts.length > 0 ? posts.map((post) => <PostPreview key={post.id} post={post} />) : <p>인기 게시글이 없습니다.</p>}
        </div>
      </div>

      {/* 글쓰기 버튼 */}
      <Button text="+" type="floating-btn" onClick={handleWriteClick} />
    </div>
  );
};

export default Home;
