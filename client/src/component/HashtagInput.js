//해시태그 추출하기(게시물 작성 및 수정)
import React, {useState} from 'react';
import './Hashtag.css';

const BASE_URL = process.env.REACT_APP_API_URL;

const HashtagInput = ({ onAddHashtags }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
    };
    
    const extractHashtags = (text) => {
        const regex = /#([^\s#]+)/g;  // # 제외한 문자로 해시태그 추출
        const extracted = text.match(regex);
        return extracted ? extracted : [];
    };

    //엔터키 눌렀을 때 해시태그 추가
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            e.preventDefault(); // 폼 제출 방지 (새로고침 방지)
            
            const newHashtags = extractHashtags(inputValue);
            onAddHashtags(newHashtags);  // 부모 컴포넌트로 해시태그 전달
            
            setInputValue(''); // 입력란 초기화
        }
    };

    return (
        
        <div className="hashtag-input">
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="#해시태그 작성"
            />
        </div>

    );
};


export default HashtagInput;