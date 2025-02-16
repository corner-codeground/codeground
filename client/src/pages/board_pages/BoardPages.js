import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BoardTabs from "../../component/BoardTabs";
import PostPreview from "./PostPreview";
import Button from "../../component/Button";
import { FaSearch } from "react-icons/fa";
import "./BoardPages.css";

const BASE_URL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("token"); // 🔥 저장된 토큰 가져오기

const BoardPages = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();

  const [boardData, setBoardData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [topPosts, setTopPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBoardData = async () => {
      try {//api 연결 필요
        const res = await axios.get(`${BASE_URL}/boards/:${boardId}/posts`, {
          headers: { Authorization: `Bearer your_jwt_token` },
        });
        if (res.data.success) {
          setPosts(res.data.data);
        }
      } catch (error) {
        console.error("게시글 가져오기 실패:", error);
      }
    };

    fetchBoardData();
  }, [boardId]);

  useEffect(() => {
    const fetchTopPosts = async () => {
      try {//api 확인 필요
        
        const res = await axios.get(`${BASE_URL}/popular`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setTopPosts(res.data.data.slice(0, 3)); // 상위 3개 인기글
        }
      } catch (error) {
        console.error("인기 게시글 가져오기 실패:", error);
      }
    };

    fetchTopPosts();
  }, []);

  const handleWriteClick = () => navigate("/writting");
  const handleSearch = () => searchQuery.trim() && alert(`검색어: ${searchQuery}`);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  return (
    <div>
      <BoardTabs />
      <div className="explain-board">
        게시판 TOP 3
        <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="게시판 내에서 검색하기" />
        <button onClick={handleSearch} className="inBoard-searching-btn">
          <FaSearch color={"#7FA1C3"} />
        </button>
        <br />
        <div className="post-preview-container">
          <div className="top-posts">
            {topPosts.map((post) => (
              <PostPreview key={post.id} post={post} />
            ))}
          </div>
          <hr className="separator" />
          <div className="all-posts">
            {posts.map((post) => (
              <PostPreview key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
      <Button text="+" type="floating-btn" onClick={handleWriteClick} />
    </div>
  );
};

export default BoardPages;
