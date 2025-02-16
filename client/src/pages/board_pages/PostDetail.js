import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HashtagList from "../../component/HashtagList";
import Button from "../../component/Button";
import axios from "axios"; // axios 추가
import { Bookmark } from "lucide-react";
import CommentSection from "./CommentSection";
import PopularPosts from "./PopularPosts";

const BASE_URL = process.env.REACT_APP_API_URL;

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [codeResult, setCodeResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [scrapped, setScrapped] = useState(false);
  const [comments, setComments] = useState(0);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState(null); // 사용자 정보 상태 추가

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/posts/${postId}`);
        setPost(response.data);
        setLikes(response.data.likes);
        setComments(response.data.comments);
      } catch (error) {
        console.error("게시글을 불러오는 중 오류 발생:", error);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/user`); // 사용자 정보 불러오기
        setUser(response.data);
      } catch (error) {
        console.error("사용자 정보를 불러오는 중 오류 발생:", error);
      }
    };

    fetchPost();
    fetchUser();
  }, [postId]);

  if (!post || !user) {
    return <div>데이터를 불러오는 중...</div>;
  }

  // 내 게시글인지 확인
  const isAuthor = user.name === post.author;

  return (
    <div className="whole-page">
      <div className="title-container">
        <div className="this-post-title">{post.title}</div>
        {isAuthor && (
          <div className="post-actions">
            <button onClick={() => navigate(`/post-edit/${post.id}`)} className="scrap-btn">
              수정
            </button>
            <button className="scrap-btn">삭제</button>
          </div>
        )}
        <button onClick={() => setScrapped(!scrapped)} className="scrap-btn">
          <Bookmark size={30} color={scrapped ? "#7FA1C3" : "black"} fill={scrapped ? "#7FA1C3" : "none"} />
        </button>
      </div>
      <div className="this-post-author">{post.author}</div>
      <div className="comment">
        <CommentSection user={user} />
      </div>
    </div>
  );
};

export default PostDetail;
