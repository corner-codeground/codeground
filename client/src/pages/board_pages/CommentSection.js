import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

const CommentSection = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");
    const [newReply, setNewReply] = useState("");
    const [replyTo, setReplyTo] = useState(null);

     // 댓글 불러오기 (초기 데이터 로드)
    useEffect(() => {
        axios.get(`${BASE_URL}/comment`)  // 백엔드에서 댓글을 가져오는 GET 요청
            .then(response => {
                setComments(response.data);
            })
            .catch(error => {
                console.error("댓글을 불러오는 데 실패했습니다.", error);
            });
    }, []);


    const handleAddComment = () => {
        if (newComment.trim() === "") return;

        const newCommentObj = {
            text: newComment,
            isMine: true,
            author: {
                name: "내 이름",
                profilePic: "https://via.placeholder.com/40",
            },
            createdAt: new Date(),
            replies: [],
        };

        // 서버에 댓글 추가 요청 (POST 요청)
        axios.post(`${BASE_URL}/comment`, newCommentObj)
            .then(response => {
                setComments([...comments, response.data]);  // 새 댓글 추가
                setNewComment("");  // 입력창 초기화
            })
            .catch(error => {
                console.error("댓글 추가에 실패했습니다.", error);
            });
    };

    const handleDeleteComment = (id) => {
        axios.delete(`${BASE_URL}/comment/${id}`)  // 댓글 삭제 요청
            .then(() => {
                setComments(comments.filter((comment) => comment.id !== id));  // 삭제된 댓글 제거
            })
            .catch(error => {
                console.error("댓글 삭제에 실패했습니다.", error);
            });
    };

    const handleEditComment = (id, text) => {
        setEditingId(id);
        setEditText(text);
    };

    const handleSaveEdit = (id) => {
        const updatedComment = { text: editText };

         // 서버에 댓글 수정 요청 (PUT 요청)
         axios.put(`${BASE_URL}/comment/${id}`, updatedComment)
         .then(response => {
             setComments(
                 comments.map((comment) =>
                     comment.id === id ? { ...comment, text: editText } : comment
                 )
             );
             setEditingId(null);
             setEditText("");
         })
         .catch(error => {
             console.error("댓글 수정에 실패했습니다.", error);
         });
 };

    const handleAddReply = (commentId) => {
        if (newReply.trim() === "") return;

        const replyObj = {
            text: newReply,
            isMine: true,
            author: {
                name: "내 이름",
                profilePic: "https://via.placeholder.com/40",
            },
            createdAt: new Date(),
        };

         // 서버에 답글 추가 요청 (POST 요청)
         axios.post(`${BASE_URL}/comment/${commentId}/reply`, replyObj)
         .then(response => {
             setComments(
                 comments.map((comment) =>
                     comment.id === commentId
                         ? { ...comment, replies: [...comment.replies, response.data] }
                         : comment
                 )
             );
             setNewReply("");  // 입력창 초기화
             setReplyTo(null);  // 답글 대상 초기화
         })
         .catch(error => {
             console.error("답글 추가에 실패했습니다.", error);
         });
 };

 return (
        <div className="comment-section">
            <div className="comment-list">
                {comments.map((comment) => (
                    <div key={comment.id} className="comment-item">
                        {/* 사진과 댓글 내용 영역 */}
                        <div className="comment-author">
                            <img
                                src={comment.author.profilePic}
                                alt={comment.author.name}
                                className="profile-pic"
                            />
                            <div className="comment-details">
                                <div className="comment-name">{comment.author.name}</div>
                                {/* 댓글 텍스트 영역 */}
                                {editingId === comment.id ? (
                                    <input
                                        type="text"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        className="edit-input"
                                    />
                                ) : (
                                    <div className="comment-text">{comment.text}</div>
                                )}
                                {/* 댓글 작성 시간 */}
                                <div className="comment-time">
                                    {comment.createdAt.toLocaleString()}
                                </div>
                            </div>
                        </div>

                        {/* 수정/삭제 버튼 영역 (오른쪽 끝에 배치) */}
                        {comment.isMine && (
                            <div className="comment-actions">
                                {editingId === comment.id ? (
                                    <button onClick={() => handleSaveEdit(comment.id)}>
                                        저장
                                    </button>
                                ) : (
                                    <>
                                        <button onClick={() => handleEditComment(comment.id, comment.text)}>
                                            수정
                                        </button>
                                        <button onClick={() => handleDeleteComment(comment.id)}>
                                            삭제
                                        </button>
                                    </>
                                )}
                            </div>
                        )}

                        {/* 답글 입력창과 답글 버튼 (댓글 아래에 배치, 너비 100%로) */}
                        {replyTo === comment.id && (
                            <div className="reply-input">
                                <input
                                    type="text"
                                    placeholder="답글을 입력하세요..."
                                    value={newReply}
                                    onChange={(e) => setNewReply(e.target.value)}
                                    className="reply-input-box"
                                />
                                <button
                                    onClick={() => handleAddReply(comment.id)}
                                    className="reply-button"
                                >
                                    등록
                                </button>
                            </div>
                        )}

                        {/* 답글 버튼 (수정/삭제 버튼 아래에 배치, 오른쪽 끝으로 붙이기) */}
                        {!replyTo && (
                            <button onClick={() => setReplyTo(comment.id)} className="reply-button">
                                답글
                            </button>
                        )}

                        {/* 댓글 답글 내용 */}
                        {comment.replies && comment.replies.length > 0 && (
                            <div className="comment-replies">
                                {comment.replies.map((reply) => (
                                    <div key={reply.id} className="comment-item">
                                        <div className="comment-author">
                                            <img
                                                src={reply.author.profilePic}
                                                alt={reply.author.name}
                                                className="profile-pic"
                                            />
                                            <div className="comment-details">
                                                <div className="comment-name">{reply.author.name}</div>
                                                <div className="comment-text">{reply.text}</div>
                                                <div className="comment-time">
                                                    {reply.createdAt.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* 댓글 입력창 */}
            <div className="comment-input-container">
                <input
                    type="text"
                    placeholder="댓글을 입력하세요..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="comment-input"
                />
                <button onClick={handleAddComment} className="comment-button">
                    등록
                </button>
            </div>
        </div>
    );
};

export default CommentSection;
