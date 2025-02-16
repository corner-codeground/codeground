// import React, { useState } from "react";
// import './CommentSection.css';

// const CommentSection = () => {
//     const [comments, setComments] = useState([
//         {
//             id: 1,
//             text: "첫 번째 댓글입니다!",
//             isMine: true,
//             author: {
//                 name: "내 이름",
//                 profilePic: "https://via.placeholder.com/40",
//             },
//             createdAt: new Date(),
//             replies: [],
//         },
//         {
//             id: 2,
//             text: "이 기능 잘 동작하는지 확인 중이에요!",
//             isMine: false,
//             author: {
//                 name: "다른 사용자",
//                 profilePic: "https://via.placeholder.com/40",
//             },
//             createdAt: new Date(),
//             replies: [],
//         },
//     ]);

//     const [newComment, setNewComment] = useState("");
//     const [editingId, setEditingId] = useState(null);
//     const [editText, setEditText] = useState("");
//     const [newReply, setNewReply] = useState("");
//     const [replyTo, setReplyTo] = useState(null);

//     const handleAddComment = () => {
//         if (newComment.trim() === "") return;

//         const newCommentObj = {
//             id: Date.now(),
//             text: newComment,
//             isMine: true,
//             author: {
//                 name: "내 이름",
//                 profilePic: "https://via.placeholder.com/40",
//             },
//             createdAt: new Date(),
//             replies: [],
//         };

//         setComments([...comments, newCommentObj]);
//         setNewComment("");
//     };

//     const handleDeleteComment = (id) => {
//         setComments(comments.filter((comment) => comment.id !== id));
//     };

//     const handleEditComment = (id, text) => {
//         setEditingId(id);
//         setEditText(text);
//     };

//     const handleSaveEdit = (id) => {
//         setComments(
//             comments.map((comment) =>
//                 comment.id === id ? { ...comment, text: editText } : comment
//             )
//         );
//         setEditingId(null);
//         setEditText("");
//     };

//     const handleAddReply = (commentId) => {
//         if (newReply.trim() === "") return;

//         const replyObj = {
//             id: Date.now(),
//             text: newReply,
//             isMine: true,
//             author: {
//                 name: "내 이름",
//                 profilePic: "https://via.placeholder.com/40",
//             },
//             createdAt: new Date(),
//         };

//         setComments(
//             comments.map((comment) =>
//                 comment.id === commentId
//                     ? { ...comment, replies: [...comment.replies, replyObj] }
//                     : comment
//             )
//         );
//         setNewReply("");
//         setReplyTo(null);
//     };

//     return (
//         <div className="comment-section">
//             <div className="comment-list">
//                 {comments.map((comment) => (
//                     <div key={comment.id} className="comment-item">
//                         {/* 사진과 댓글 내용 영역 */}
//                         <div className="comment-author">
//                             <img
//                                 src={comment.author.profilePic}
//                                 alt={comment.author.name}
//                                 className="profile-pic"
//                             />
//                             <div className="comment-details">
//                                 <div className="comment-name">{comment.author.name}</div>
//                                 {/* 댓글 텍스트 영역 */}
//                                 {editingId === comment.id ? (
//                                     <input
//                                         type="text"
//                                         value={editText}
//                                         onChange={(e) => setEditText(e.target.value)}
//                                         className="edit-input"
//                                     />
//                                 ) : (
//                                     <div className="comment-text">{comment.text}</div>
//                                 )}
//                                 {/* 댓글 작성 시간 */}
//                                 <div className="comment-time">
//                                     {comment.createdAt.toLocaleString()}
//                                 </div>
//                             </div>
//                         </div>

//                         {/* 수정/삭제 버튼 영역 (오른쪽 끝에 배치) */}
//                         {comment.isMine && (
//                             <div className="comment-actions">
//                                 {editingId === comment.id ? (
//                                     <button onClick={() => handleSaveEdit(comment.id)}>
//                                         저장
//                                     </button>
//                                 ) : (
//                                     <>
//                                         <button onClick={() => handleEditComment(comment.id, comment.text)}>
//                                             수정
//                                         </button>
//                                         <button onClick={() => handleDeleteComment(comment.id)}>
//                                             삭제
//                                         </button>
//                                     </>
//                                 )}
//                             </div>
//                         )}

//                         {/* 답글 입력창과 답글 버튼 (댓글 아래에 배치, 너비 100%로) */}
//                         {replyTo === comment.id && (
//                             <div className="reply-input">
//                                 <input
//                                     type="text"
//                                     placeholder="답글을 입력하세요..."
//                                     value={newReply}
//                                     onChange={(e) => setNewReply(e.target.value)}
//                                     className="reply-input-box"
//                                 />
//                                 <button
//                                     onClick={() => handleAddReply(comment.id)}
//                                     className="reply-button"
//                                 >
//                                     등록
//                                 </button>
//                             </div>
//                         )}

//                         {/* 답글 버튼 (수정/삭제 버튼 아래에 배치, 오른쪽 끝으로 붙이기) */}
//                         {!replyTo && (
//                             <button onClick={() => setReplyTo(comment.id)} className="reply-button">
//                                 답글
//                             </button>
//                         )}

//                         {/* 댓글 답글 내용 */}
//                         {comment.replies && comment.replies.length > 0 && (
//                             <div className="comment-replies">
//                                 {comment.replies.map((reply) => (
//                                     <div key={reply.id} className="comment-item">
//                                         <div className="comment-author">
//                                             <img
//                                                 src={reply.author.profilePic}
//                                                 alt={reply.author.name}
//                                                 className="profile-pic"
//                                             />
//                                             <div className="comment-details">
//                                                 <div className="comment-name">{reply.author.name}</div>
//                                                 <div className="comment-text">{reply.text}</div>
//                                                 <div className="comment-time">
//                                                     {reply.createdAt.toLocaleString()}
//                                                 </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                         )}
//                     </div>
//                 ))}
//             </div>

//             {/* 댓글 입력창 */}
//             <div className="comment-input-container">
//                 <input
//                     type="text"
//                     placeholder="댓글을 입력하세요..."
//                     value={newComment}
//                     onChange={(e) => setNewComment(e.target.value)}
//                     className="comment-input"
//                 />
//                 <button onClick={handleAddComment} className="comment-button">
//                     등록
//                 </button>
//             </div>
//         </div>
//     );
    
    
// };

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CommentSection.css";

const BASE_URL = process.env.REACT_APP_API_URL;

const CommentSection = ({ postId, user }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    const token = localStorage.getItem("token"); // ✅ 로그인한 사용자 인증

    // ✅ 1. 댓글 불러오기 (GET /comment?post_id={postId})
    useEffect(() => {
        console.log("📌 현재 postId:", postId);
        if (!postId) {
            console.warn("⚠️ postId가 없습니다. 댓글을 불러오지 않습니다.");
            return;
        }
    
        const fetchComments = async () => {
            try {
                console.log(`📌 GET 요청: ${BASE_URL}/comment/list?post_id=${postId}`);
                const response = await axios.get(`${BASE_URL}/comment/list?post_id=${postId}`); // ✅ API 경로 변경
                console.log("📌 댓글 데이터:", response.data);
                setComments(response.data);
            } catch (error) {
                console.error("댓글 불러오기 오류:", error);
            }
        };
    
        fetchComments();
    }, [postId]);
    

    // ✅ 2. 댓글 추가하기 (POST /comment)
    const handleAddComment = async () => {
        if (newComment.trim() === "") return;

        try {
            console.log(`📌 POST 요청: ${BASE_URL}/comment`); // ✅ 디버깅용 로그 추가
            const response = await axios.post(
                `${BASE_URL}/comment`,
                {
                    post_id: postId,
                    comment: newComment,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            console.log("📌 댓글 추가 완료:", response.data); // ✅ 응답 확인
            setComments([...comments, response.data.comment]); // ✅ 기존 comments 배열에 추가
            setNewComment("");
        } catch (error) {
            console.error("댓글 추가 오류:", error);
        }
    };

    // ✅ 3. 댓글 수정하기 (PATCH /comment/:id)
    const handleEditComment = async (commentId) => {
        if (editText.trim() === "") return;

        try {
            console.log(`📌 PATCH 요청: ${BASE_URL}/comment/${commentId}`); // ✅ 디버깅용 로그 추가
            const response = await axios.patch(
                `${BASE_URL}/comment/${commentId}`,
                { comment: editText },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("📌 댓글 수정 완료:", response.data); // ✅ 응답 확인
            setComments(comments.map(comment =>
                comment.id === commentId ? { ...comment, comment: response.data.comment.comment } : comment
            ));
            setEditingId(null);
            setEditText("");
        } catch (error) {
            console.error("댓글 수정 오류:", error);
        }
    };

    // ✅ 4. 댓글 삭제하기 (DELETE /comment/:id)
    const handleDeleteComment = async (commentId) => {
        try {
            console.log(`📌 DELETE 요청: ${BASE_URL}/comment/${commentId}`); // ✅ 디버깅용 로그 추가
            await axios.delete(`${BASE_URL}/comment/${commentId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("📌 댓글 삭제 완료"); // ✅ 응답 확인
            setComments(comments.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.error("댓글 삭제 오류:", error);
        }
    };

    return (
        <div className="comment-section">
            <div className="comment-list">
                {comments.map((comment) => (
                    <div key={comment.id} className="comment-item">
                        <div className="comment-author">
                            <img src={comment.User?.profilePic || "https://via.placeholder.com/40"} alt="프로필" className="profile-pic" />
                            <div className="comment-details">
                                <div className="comment-name">{comment.User?.username || "익명"}</div>
                                {editingId === comment.id ? (
                                    <input
                                        type="text"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                    />
                                ) : (
                                    <div className="comment-text">{comment.comment}</div>
                                )}
                                <div className="comment-time">{new Date(comment.createdAt).toLocaleString()}</div>
                            </div>
                        </div>

                        {/* 댓글 수정 / 삭제 버튼 */}
                        {user && user.id === comment.user_id && (
                            <div className="comment-actions">
                                {editingId === comment.id ? (
                                    <button onClick={() => handleEditComment(comment.id)}>저장</button>
                                ) : (
                                    <>
                                        <button onClick={() => { setEditingId(comment.id); setEditText(comment.comment); }}>수정</button>
                                        <button onClick={() => handleDeleteComment(comment.id)}>삭제</button>
                                    </>
                                )}
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
                />
                <button onClick={handleAddComment}>등록</button>
            </div>
        </div>
    );
};

export default CommentSection;
