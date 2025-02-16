import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BoardTabs from "../../component/BoardTabs";
import PostPreview from "./PostPreview";
import Button from "../../component/Button";
import { FaSearch } from "react-icons/fa";
import "./BoardPages.css";

const BASE_URL = process.env.REACT_APP_API_URL;

const BoardPages = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();

  const [boardData, setBoardData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [topPosts, setTopPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기

  useEffect(() => {
    const fetchBoardData = async () => {
      if (!token) {
        console.error("토큰이 없습니다. 로그인 페이지로 리다이렉션합니다.");
        navigate("/login");  // 토큰이 없으면 로그인 페이지로 이동
        return;
      }

      try {
        const res = await axios.get(`${BASE_URL}/posts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setPosts(res.data.data);
        }
      } catch (error) {
        console.error("게시글 가져오기 실패:", error);
      }
    };

    fetchBoardData();
  }, [boardId, token, navigate]);  // token과 navigate가 변경될 때마다 실행되도록 설정


  useEffect(() => {
    const fetchTopPosts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/boards/${boardId}/posts/popular`, {
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

  const handleWriteClick = () => navigate("/writting/:postId");
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
