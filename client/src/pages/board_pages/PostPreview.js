import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './PostPreview.css';

const PostPreview = ({ post, isEditing, onSelect, isSelected, boardId, updateLikesAndComments  }) => {
    const navigate = useNavigate();

    const [likes, setLikes] = useState(post.likes); // 좋아요 상태
    const [comments, setComments] = useState(post.comments); // 댓글 수

    // 해당 게시글 상세 페이지로 이동
    const handleClick = (e) => {
        if (isEditing) {
            e.stopPropagation(); // 편집모드일 때는 이동 방지
            return;
        }
        navigate(`/boards/${post.boardId}/${post.id}`, { state: { comments } });
    };

    const handleSelectClick = (e) => {
        if (isEditing) { 
            onSelect(post.id); 
        }
    };

    // 좋아요 클릭 시 좋아요 수 증가
    const handleLikeClick = () => {
        const updatedLikes = likes + 1;
        setLikes(updatedLikes);
        updateLikesAndComments(post.id, updatedLikes, comments);  // 상위 컴포넌트에 변경된 값을 전달
    };

    return (
        <div className={`post-preview ${isSelected ? 'selected' : ''}`}
            onClick={handleClick}
        >
            <img src={post.thumbnail} alt="썸네일" className="thumbnail" />
            <div className="post-info">
                <p className="post-title">{post.title}</p>
                <p className="post-author">{post.author}</p>
                <div className="post-stats">
                    {/* 댓글 아이콘 추가 */}
                    <span className="comments-count">
                        <i className="fas fa-comment"></i> {comments}
                    </span>
                    {/* 좋아요 아이콘 추가 */}
                    <span className="likes-count">
                        <i className="fas fa-heart"></i> {likes}
                    </span>
                </div>
            </div>
            {isSelected && isEditing && (
                <div className="check-mark">✔</div>
            )}
            <div onClick={handleSelectClick} className="select-overlay"></div>
        </div>
    );
};

export default PostPreview;
