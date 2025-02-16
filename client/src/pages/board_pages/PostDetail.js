import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; 

const BASE_URL = process.env.REACT_APP_API_URL;

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error("게시글을 불러오는 중 오류 발생:", error);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/users`); // 사용자 정보 불러오기
        setUser(response.data);
      } catch (error) {
        console.error("🚨 사용자 정보를 불러오는 중 오류 발생:", error);
      }
    };

    fetchPost();
    fetchUser();
  }, [postId]);

  if (!post || !user) {
    return <div>데이터를 불러오는 중...</div>;
  }

  return (
    <div className="whole-page">
      <div className="title-container">
        <div className="this-post-title">{post.title}</div>
      </div>
      <div className="this-post-author">{post.author}</div>
    </div>
  );
};

export default PostDetail;
