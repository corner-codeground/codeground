import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './PostPreview.css';

const BASE_URL = process.env.REACT_APP_API_URL;

const PostPreview = ({ post, isEditing, onSelect, isSelected, boardId, updateLikesAndComments  }) => {
    const navigate = useNavigate();

    const [likes, setLikes] = useState(post.likes); // 좋아요 상태
    const [comments, setComments] = useState(post.comments); // 댓글 수
    // 사용자가 이미 좋아요를 눌렀는지 여부
    const [liked, setLiked] = useState(false);

    // 컴포넌트 마운트 시점에, 현재 유저가 이 게시물에 좋아요를 눌렀는지 체크
    useEffect(() => {
        const checkLikedStatus = async () => {
            try {
                // GET /likes/check?post_id=123
                const response = await axios.get(`${BASE_URL}/likes/check?post_id=${post.id}`);
                // 서버가 { liked: true } 형태로 준다고 가정
                if (response.data.liked) {
                    setLiked(true);
                }
            } catch (error) {
                console.error("좋아요 여부 확인 실패: ", error);
            }
        };
        checkLikedStatus();
    }, [post.id]);
    // 좋아요 개수도 최신화하고 싶다면, 컴포넌트 로드시 서버로부터 likeCount를 가져올 수 있음
    useEffect(() => {
        const fetchLikeCount = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/likes/${post.id}/count`);
            // 서버가 { likeCount: 10 } 형태로 준다고 가정
                setLikes(response.data.likeCount);
            } catch (error) {
            console.error("좋아요 개수 가져오기 실패: ", error);
            }
        };
        fetchLikeCount();
    }, [post.id]);

    
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

    // [중요] 좋아요 토글
    const handleLikeClick = async (e) => {
        e.stopPropagation(); // 부모 div의 onClick(상세보기) 이벤트가 실행되지 않도록
            try {
        // POST /likes, body: { post_id: 123 }
            const response = await axios.post(`${BASE_URL}/likes`, { post_id: post.id });
        // 예: 서버가 { likeCount: 5, liked: true } 형태로 응답한다고 가정
            const { likeCount, liked } = response.data;
                setLikes(likeCount);
                setLiked(liked);
                // 상위 컴포넌트에도 갱신된 likes, comments 정보를 전달해야 한다면
                updateLikesAndComments(post.id, likeCount, comments);
            } catch (error) {
                console.error("좋아요 토글 실패: ", error);
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
