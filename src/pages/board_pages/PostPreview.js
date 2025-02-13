//게시글 미리보기 박스
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import './PostPreview.css';

const PostPreview = ({ post, isEditing, onSelect, isSelected, boardId }) => {
    const navigate = useNavigate();

    // 해당 게시글 상세 페이지로 이동
    const handleClick = (e) => {
        if (isEditing) {
            e.stopPropagation(); // 편집모드일 때는 이동 방지
            return;
        }
        navigate(`/post/${post.id}`);
    };

    const handleSelectClick = (e) => {
        if (isEditing) { 
            onSelect(post.id); 
        }
    };

    return (
        <div className={`post-preview ${isSelected ? 'selected' : ''}`}
            onClick={handleClick}
        >
            <img src={post.thumbnail} alt="썸네일" className="thumbnail" />
            <div className="post-info">
                <p className="post-title">{post.title}</p>
                <p className="post-author">{post.author}</p>
            </div>
            {isSelected && isEditing && (
                <div className="check-mark">✔</div>
            )}
            <div onClick={handleSelectClick} className="select-overlay"></div>
        </div>
    );
};

export default PostPreview;