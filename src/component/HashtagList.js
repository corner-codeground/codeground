import React from 'react';
import './Hashtag.css';

const HashtagList = ({ hashtags, onRemoveHashtag }) => {
    return (
        <div className="hashtag-list">
            {hashtags.map((hashtag, index) => (
                <div key={index} className="hashtag">
                {hashtag}
                <div
                    className="remove-hashtag"
                    onClick={() => onRemoveHashtag(index)} // 클릭 시 삭제 함수 호출
                    >
                        &times;
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HashtagList;