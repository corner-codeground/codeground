import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Writting.css";
import DateDisplay from "../component/DateDisplay";
import Editor from "../component/Editor";
import Button from "../component/Button";
import HashtagInput from "../component/HashtagInput";
import HashtagList from "../component/HashtagList";

const BASE_URL = process.env.REACT_APP_API_URL;

const Writting = ({ initialTitle = "", initialContent = "", onSave }) => {
  const { postId } = useParams();
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [category, setCategory] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);  // ✅ 추가
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleAddHashtag = (newHashtags) => {
    setHashtags((prev) => [...prev, ...newHashtags]);
  };

  const handleRemoveHashtag = (index) => {
    setHashtags(hashtags.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);  // ✅ 로딩 상태 시작

    const postData = {
      title,
      content,
      hashtags,
      board_id: parseInt(category, 10),
      is_public: true,
    };

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      let response;
      if (postId) {
        response = await fetch(`${BASE_URL}/posts/${postId}`, {
          method: "PUT",
          headers,
          body: JSON.stringify(postData),
        });
      } else {
        response = await fetch(`${BASE_URL}/posts`, {
          method: "POST",
          headers,
          body: JSON.stringify(postData),
        });
      }
      const responseText = await response.text(); // 추가

      if (response.ok) {
        // const data = await response.json();
        const data = JSON.parse(responseText); // JSON으로 변환

        console.log("게시글 저장 완료:", data);
        setIsLoading(false);  // ✅ 저장 완료 후 로딩 해제
        navigate(`/post/${data.post.id}`);
      } else {
        console.error("게시글 저장 실패", responseText/*await response.json()*/);
      }
    } catch (error) {
      console.error("게시글 저장 중 오류 발생:", error);
      setIsLoading(false);  // ✅ 오류 발생 시에도 로딩 해제
    }
  };

  const handleCancel = () => navigate(-1);

  return (
    <div className="container">
      <div className="title-input">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력하세요" />
      </div>
      <div className="category">
        <select name="category_select" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="" disabled>게시판 선택</option>
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
          <Button text={isLoading ? "저장 중..." : "저장"} type="default" onClick={handleSubmit} disabled={isLoading} />
        </div>
      </div>
      <div className="hashtag-list">
        <HashtagList hashtags={hashtags} onRemoveHashtag={handleRemoveHashtag} />
      </div>
    </div>
  );
};

export default Writting;
