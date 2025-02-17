import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; 
import { Bookmark } from "lucide-react";
import CommentSection from "./CommentSection"; 

const BASE_URL = process.env.REACT_APP_API_URL;

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [scrapped, setScrapped] = useState(false);
  const [likes, setLikes] = useState(0);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/posts/${postId}`);
        setPost(response.data);
        setLikes(response.data.likes);
      } catch (error) {
        console.error("게시글을 불러오는 중 오류 발생:", error);
      }
    };

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(`${BASE_URL}/auth/account`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("사용자 정보를 불러오는 중 오류 발생:", error);
      }
    };
    fetchPost();
    fetchUser();
  }, [postId]);

  if (!post) {
    return <div>데이터를 불러오는 중...</div>;
  }

  // ✅ 내 게시글인지 확인
  const isAuthor = user && user.name === post.author;

  return (
    <div className="whole-page">
      <div className="title-container">
        <div className="this-post-title">{post.title}</div>
        {isAuthor && (
          <div className="post-actions">
            <button onClick={() => navigate(`/post-edit/${post.id}`)} className="scrap-btn">수정</button>
            <button className="scrap-btn">삭제</button>
          </div>
        )}
        <button onClick={() => setScrapped(!scrapped)} className="scrap-btn">
          <Bookmark size={30} color={scrapped ? "#7FA1C3" : "black"} fill={scrapped ? "#7FA1C3" : "none"} />
        </button>
      </div>

      <div className="this-post-author">{post.author}</div>

      {/* ✅ 게시글 내용 추가 */}
      <div className="this-post-content">
        <p>{post.content}</p>
      </div>

      {/* ✅ 댓글 섹션 추가 */}
      <div className="comment">
        <CommentSection postId={post.id} user={user} />
      </div>
    </div>
  );
};

export default PostDetail;