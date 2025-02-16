import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Writting from "../Writting"; // Writting 컴포넌트 임포트

const BASE_URL = process.env.REACT_APP_API_URL;

const PostEditPage = () => {
  const { postId } = useParams(); // URL에서 postId 추출
  const navigate = useNavigate();
  const [post, setPost] = useState(null); // 게시글 상태

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/posts/${postId}`); // API에서 게시글 가져오기
        setPost(response.data);
      } catch (error) {
        console.error("게시글을 불러오는 중 오류 발생:", error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>게시글을 불러오는 중...</div>;
  }

  const handleSave = async (updatedPost) => {
    try {
      await axios.put(`/posts/${postId}`, updatedPost); // 게시글 수정 API 호출
      console.log("게시글 수정 완료:", updatedPost);
      navigate(`/post/${postId}`); // 수정 완료 후 해당 게시글 페이지로 이동
    } catch (error) {
      console.error("게시글 수정 중 오류 발생:", error.response || error);
    }
  };
  

  return (
    <div>
      <h1>게시글 수정</h1>
      <Writting initialTitle={post.title} initialContent={post.content} onSave={handleSave} />
    </div>
  );
};

export default PostEditPage;