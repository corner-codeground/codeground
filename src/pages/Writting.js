//게시글 작성 및 수정
import React, {useState, useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './Writting.css';
import DateDisplay from '../component/DateDisplay';
import EditorToolbar from '../component/EditorToolbar';
import Editor from '../component/Editor';
import Button from '../component/Button';

const Writting = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const editorRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("제목: ", title);
        console.log("내용: ", content);
    };

    //글에 스타일 적용하는 함수
    const applyStyle = (styleType) => {
        if(editorRef.current) {
            document.execCommand(styleType, false, null);
        }
    };

    const navigate = useNavigate(); //취소 or 저장 버튼 누르면 페이지 이동동
    const handleCancel = () => { // 취소 버튼 클릭 시 이전 페이지로 이동
        navigate(-1); 
    };

    return (
        <div className="container">
            <div className="title-input">
                <input
                    type= "text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목을 입력하세요"
                />
            </div>
            <div className="category">
                <select name="category_select">
                <option value="" disabled selected>게시판 선택</option> 
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
            <EditorToolbar />
            <Editor content={content} setContent={setContent} />
            
            <div className="cancel-save-btn">
                <Button text="취소" type="negative" onClick={handleCancel} />
                <Button text="저장" type="default" onClick={() => alert('저장버튼 클릭!')} />
            </div>
        </div>
    );
};

export default Writting;