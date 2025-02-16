import React, { useState, useRef, useEffect } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';
import './Writting.css';
import DateDisplay from '../component/DateDisplay';
import EditorToolbar from '../component/EditorToolbar';
import Editor from '../component/Editor';
import Button from '../component/Button';
import HashtagInput from '../component/HashtagInput';
import HashtagList from '../component/HashtagList';

const Writting = ({ initialTitle, initialContent, onSave }) => {
    const { postId } = useParams();  // URL에서 postId를 받아옴
    const [title, setTitle] = useState(initialTitle || '');
    const [content, setContent] = useState(initialContent || '');
    const editorRef = useRef(null);
    const [category, setCategory] = useState('');  // 카테고리 상태 추가
    const [hashtags, setHashtags] = useState([]);  // 해시태그 상태 관리
    
    const handleRemoveHashtag = (index) => {    //해시태그 삭제 함수
        setHashtags(hashtags.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = {
            title,
            content,
            hashtags,
            category,  // 카테고리도 postData에 포함
        };

        if (!postId) {
            console.error("Post ID가 없습니다.");
            return;
        }

        // 수정된 내용이 포함된 객체를 부모로 전달
        try {
            const response = await fetch(`/api/posts/${postId}`, {
                method: 'PUT', // PUT 요청으로 수정
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("게시글 수정 완료:", data);
                // 수정 완료 후, 게시글 상세 페이지로 리다이렉트
                navigate(`/post/${postId}`);
            } else {
                console.error('게시글 수정 실패');
            }
        } catch (error) {
            console.error("게시글 수정 중 오류 발생:", error);
        }
    };

    // 해시태그 추가 함수
    const handleAddHashtag = (newHashtags) => {
        setHashtags((prevHashtags) => [...prevHashtags, ...newHashtags]);
    };

    const navigate = useNavigate();  // 취소 or 저장 버튼 누르면 페이지 이동
    const handleCancel = () => {  // 취소 버튼 클릭 시 이전 페이지로 이동
        navigate(-1); 
    };

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
                    <HashtagInput onAddHashtags={handleAddHashtag} /> {/* 해시태그 추가 함수 전달 */}
                    <Button text="저장" type="default" onClick={handleSubmit} />
                </div>
            </div>
            <div className="hashtag-list">
                <HashtagList hashtags={hashtags} onRemoveHashtag={handleRemoveHashtag}/>  {/* 해시태그 목록 전달 */}
            </div>
        </div>
    );
};

export default Writting;
