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

  const [posts, setPosts] = useState([]); // 게시글 목록
  const [topPosts, setTopPosts] = useState([]); // 인기 게시글 목록
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // ✅ 게시판의 게시글 조회 (GET /boards/:boardId/posts)
    const fetchBoardPosts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/boards/${boardId}/posts`);

        console.log("📌 게시글 응답 데이터:", res.data); // 디버깅용 출력

        // ✅ API 응답이 배열인지 확인하여 처리
        if (Array.isArray(res.data)) {
          setPosts(res.data); // 배열 그대로 저장
        } else if (res.data.success && Array.isArray(res.data.data)) {
          setPosts(res.data.data); // { success: true, data: [...] } 형태일 때
        } else {
          console.warn("⚠️ 예상치 못한 응답 형식:", res.data);
        }
      } catch (error) {
        console.error("❌ 게시글 가져오기 실패:", error);
      }
    };

    // ✅ 인기 게시글 조회 (GET /posts/popular)
    const fetchTopPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${BASE_URL}/posts/popular`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success && Array.isArray(res.data.data)) {
          setTopPosts(res.data.data.slice(0, 3)); // 상위 3개 인기글
        } else {
          console.warn("⚠️ 인기 게시글 응답 데이터가 예상과 다릅니다.");
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.warn("⚠️ `GET /posts/popular` API 없음 (404) - 무시 가능");
        } else {
          console.error("❌ 인기 게시글 가져오기 실패:", error);
        }
      }
    };

    fetchBoardPosts();
    fetchTopPosts();
  }, [boardId]);

  // 글쓰기 페이지 이동
  const handleWriteClick = () => navigate("/writting");

  return (
    <div>
      <BoardTabs />
      <div className="explain-board">
        {topPosts.length > 0 && (
          <>
            <p>게시판 TOP 3</p>
            <div className="top-posts">
              {topPosts.map((post) => (
                <PostPreview key={post.id} post={post} />
              ))}
            </div>
            <hr className="separator" />
          </>
        )}

        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="게시판 내에서 검색하기" />
        <button onClick={() => alert(`검색어: ${searchQuery}`)} className="inBoard-searching-btn">
          <FaSearch color={"#7FA1C3"} />
        </button>

        <div className="post-preview-container">
          {posts.length > 0 ? posts.map((post) => <PostPreview key={post.id} post={post} />) : <p>이 게시판에는 아직 게시글이 없습니다.</p>}
        </div>
      </div>
      <Button text="+" type="floating-btn" onClick={handleWriteClick} />
    </div>
  );
};

export default BoardPages;
