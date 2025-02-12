//게시글 미리보기 박스
import React from 'react';
import {useNavigate} from "react-router-dom";
import './PostPreview.css';

const PostPreview = ({ post }) => {
    const navigate = useNavigate();

    // 해당 게시글 상세 페이지로 이동
    const handleClick = () => {
        navigate(`/post/${post.id}`);
    };

    return (
        <div className="post-preview" onClick={handleClick}>
            <img src={post.thumbnail} alt="썸네일" className="thumbnail" />
            <div className="post-info">
                <p className="post-title">{post.title}</p>
                <p className="post-author">{post.author}</p>
            </div>
        </div>
    );
};

export default PostPreview;