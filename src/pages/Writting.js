//게시글 작성 및 수정
import React, {useState} from 'react';
import './Writting.css';

const Writting = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("제목: ", title);
        console.log("내용: ", content);
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
                <hr />
            </div>
            <div className="content-input">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="내용을 입력하세요">
                </textarea>
            </div>
        </div>
    );
};

export default Writting;