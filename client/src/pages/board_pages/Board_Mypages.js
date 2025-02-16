import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PostPreview from "./PostPreview";
import Button from "../../component/Button";
import Follow_manager from "../userInfo_follow/Follow_manager";
import BoardCategoryView from "./BoardCategoryView";
import "./BoardPages.css";

const BASE_URL = process.env.REACT_APP_API_URL;

const Board_Mypages = ({ boardId }) => {
  const navigate = useNavigate();
  const [boardData, setBoardData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchBoardData = async () => {
      const data = { //내가쓴 글, 글 관리 카테고리 
        10: { title: "내가 쓴 글", api: `${BASE_URL}/auth/profile` },
        11: { title: "스크랩", api: `${BASE_URL}/scraps/mypage` },
        12: { title: "글 관리", api: `${BASE_URL}/auth/profile` },
        13: { title: "팔로우 관리" },
        20: { title: "카테고리" },
      };

      setBoardData(data[boardId]);
      if (data[boardId]?.api) {
        try {
          const response = await axios.get(data[boardId].api, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          setPosts(response.data.posts || response.data.user.posts || []);
        } catch (error) {
          console.error("게시판 데이터를 불러오는 중 오류 발생:", error);
        }
      }
    };
    fetchBoardData();
  }, [boardId]);

  if (!boardData) {
    return <div>게시판 데이터를 불러오는 중입니다...</div>;
  }

  const handleWriteClick = () => {
    navigate("/writting");
  };

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  const handlePostSelect = (postId) => {
    setSelectedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]));
  };

  const handleDeleteClick = async () => {
    try {
      await Promise.all(
        selectedPosts.map((postId) =>
          axios.delete(`/posts/:${postId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          })
        )
      );
      setPosts((prev) => prev.filter((post) => !selectedPosts.includes(post.id)));
      setSelectedPosts([]);
    } catch (error) {
      console.error("게시글 삭제 중 오류 발생:", error);
    }
  };

  if (boardId === 13) {
    return <Follow_manager />;
  }

  if (boardId === 20) {
    return <BoardCategoryView posts={posts} isEditing={isEditing} handlePostSelect={handlePostSelect} selectedPosts={selectedPosts} />;
  }

  return (
    <div>
      {boardId === 12 && (
        <div className="button-container">
          <Button text={isEditing ? "삭제" : "편집"} type="edit-delete" onClick={isEditing ? handleDeleteClick : handleEditClick} />
        </div>
      )}
      <div className="all-posts">
        {posts.map((post) => (
          <PostPreview
            key={post.id}
            post={post}
            isEditing={isEditing}
            onSelect={() => handlePostSelect(post.id)}
            isSelected={selectedPosts.includes(post.id)}
            boardId={boardId}
          />
        ))}
      </div>
      <Button text="+" type="floating-btn" onClick={handleWriteClick} />
    </div>
  );
};
export default Board_Mypages;
