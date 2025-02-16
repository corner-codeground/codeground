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
  const [posts, setPosts] = useState([]);

  // API 요청을 통한 인기 게시글 가져오기
  useEffect(() => {
    const fetchPopularPosts = async () => {
      try {
        const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
        const token = localStorage.getItem("token"); // 🔥 저장된 토큰 가져오기

        const response = await axios.get(`${BASE_URL}/popular`, { // posts/popular에서 변경
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

    fetchPopularPosts();
  }, []);

  // 글쓰기 페이지로 이동
  const handleWriteClick = () => {
    navigate("/writting/:postId");
  };

  return (
    <div>
      <BoardTabs />
      <div className="explain-board">
        전체 인기글 <br />
        <div className="post-preview-container">
          {posts.map((post) => (
            <PostPreview key={post.id} post={post} />
          ))}
        </div>
      </div>
      {/* 글쓰기 버튼 */}
      <Button text="+" type="floating-btn" onClick={handleWriteClick} />
    </div>
  );
};

export default Home;
