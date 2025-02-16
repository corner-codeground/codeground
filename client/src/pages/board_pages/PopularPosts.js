import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PopularPosts.css";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001"; // 기본 URL 설정

const PopularPosts = () => {
  const [popularPosts, setPopularPosts] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("jwt_token"); // 로컬스토리지에서 JWT 토큰 가져오기
        if (!token) {
          throw new Error("로그인 필요: JWT 토큰이 없습니다.");
        }

        const res = await axios.get(`${BASE_URL}/posts/popular`, {
          headers: { Authorization: `Bearer ${token}` }, // 동적 토큰 추가
        });

        if (res.data.success) {
          setPopularPosts(res.data.data.slice(0, 3)); // 인기글 3개만 표시
        } else {
          throw new Error("API 응답 실패: success 값이 false");
        }
      } catch (error) {
        console.error("🔥 인기 게시글 가져오기 실패:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularPosts();
  }, []);

  return (
    <div className="popular-posts-content">
      <div className="popular-content-title">이 게시판의 인기글</div>

      {loading ? (
        <p>⏳ 인기 게시글을 불러오는 중...</p>
      ) : error ? (
        <p>⚠️ 오류 발생: {error}</p>
      ) : (
        <ul>
          {popularPosts.map((post) => (
            <li key={post.id}>
              <div className="popular-post-title">{post.title}</div>
              <div className="popular-post-date">{post.createdAt}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PopularPosts;
