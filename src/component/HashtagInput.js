//해시태그 추출하기(게시물 작성 및 수정)
import React, {useState} from 'react';
import './HashtagInput.css';

const HashtagInput = () => {
    const [inputValue, setInputValue] = useState('');
    const [hashtags, setHashtags] = useState([]);

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
            setHashtags((prevHashtags) => [...prevHashtags, ...newHashtags]); // 기존 해시태그와 새로 추가된 해시태그 합치기
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
            {hashtags.length > 0 && (  //해시태그 작성 내용이 있는 경우 목록 보여줌
                <div className="hashtag-list">
                    {hashtags.map((hashtag, index) => (
                        <div key={index} className="hashtag">
                            {hashtag}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


export default HashtagInput;