import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Writting.css";
import DateDisplay from "../component/DateDisplay";
import Editor from "../component/Editor";
import Button from "../component/Button";
import HashtagInput from "../component/HashtagInput";
import HashtagList from "../component/HashtagList";
import axios from "axios";


const BASE_URL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('token');  // 로컬 스토리지에서 JWT 토큰을 가져옴

const Writting = ({ initialTitle = "", initialContent = "", onSave }) => {
  const { postId } = useParams(); // URL에서 postId를 받아옴 (새 게시글이면 undefined)
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [category, setCategory] = useState(""); // 카테고리 상태
  const [hashtags, setHashtags] = useState([]); // 해시태그 상태
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 중 여부
  const editorRef = useRef(null);
  const navigate = useNavigate();

  

  const token = localStorage.getItem('token');  // 로컬 스토리지에서 JWT 토큰을 가져옴
  
  // 해시태그 삭제
  const handleRemoveHashtag = (index) => {
    setHashtags(hashtags.filter((_, i) => i !== index));
  };
// 해시태그 추가
const handleAddHashtag = (newHashtags) => {
    setHashtags((prev) => [...prev, ...newHashtags]);
  };
  // 게시글 저장 (새 글 작성 or 수정)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // 제출 중일 때 다시 클릭하지 않도록 방지

    const postData = {
      title,
      content,
      hashtags,
      board_id: parseInt(category, 10), // 숫자로 변환하여 서버에 전송
      is_public: true, // 필요 시 true/false 설정
    };

    setIsSubmitting(true); // 제출 시작
    try {
        let response;
        if (postId) {
          // Update existing post (PUT request)
          response = await axios.put(`${BASE_URL}/api/posts/${postId}`, postData, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,  // Include JWT token in headers
            },
          });
        } else {
          // Create new post (POST request)
          response = await axios.post(`${BASE_URL}/posts`, postData, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,  // Include JWT token in headers
            },
          });
        }
  
        if (response.status === 200) {
          const data = response.data;
          console.log("Post saved successfully:", data);
          navigate(`/post/${data.post.id}`); // Redirect to the post's detail page
        } else {
          console.error("Failed to save post:", response.data.message);
        }
      } catch (error) {
        console.error("Error saving post:", error);
      } finally {
        setIsSubmitting(false); // End submission
      }
    };

  // 취소 버튼 클릭 시 이전 페이지로 이동
  const handleCancel = () => navigate(-1);

  return (
    <div className="container">
      <div className="title-input">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
        />
      </div>
      <div className="category">
        <select
          name="category_select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>
            게시판 선택
          </option>
          <option value="1">프론트엔드</option>
          <option value="2">백엔드</option>
          <option value="3">보안</option>
          <option value="4">미디어</option>
          <option value="5">인공지능</option>
          <option value="6">임베디드&IoT</option>
          <option value="7">블록체인&웹3</option>
          <option value="8">빅데이터</option>
          <option value="9">코드그라운드</option>
        </select>
        <div className="date-container">
          <DateDisplay />
        </div>
      </div>
      <hr />
      <Editor content={content} setContent={setContent} editorRef={editorRef} />

      <div className="cancel-save-btn">
        <Button text="취소" type="negative" onClick={handleCancel} />
        <div className="right">
          <HashtagInput onAddHashtags={handleAddHashtag} />
          <Button
            text="저장"
            type="default"
            onClick={handleSubmit}
            disabled={!title || !content || !category || isSubmitting} // 제목, 내용, 카테고리가 없거나 제출 중일 때 비활성화
          />
        </div>
      </div>

      <div className="hashtag-list">
        <HashtagList hashtags={hashtags} onRemoveHashtag={handleRemoveHashtag} />
      </div>
    </div>
  );
};

export default Writting;
