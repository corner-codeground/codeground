import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import PostPreview from './PostPreview';
import Button from '../../component/Button';
//import {posts as allPosts} from './Posts';  //일단 allPosts 이용
import Follow_manager from '../userInfo_follow/Follow_manager';
import BoardCategoryView from "./BoardCategoryView";
import './BoardPages.css';
import axios from 'axios';

const Board_Mypages = ({ boardId }) => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);

    const [boardData, setBoardData] = useState(null); //게시판 데이터 상태 관리
    const [posts, setPosts] = useState([]); // 게시글 상태 관리

    const [selectedPosts, setSelectedPosts] = useState([]); // 선택된 게시글 관리
    const [isEditing, setIsEditing] = useState(false); // 편집 모드 상태

    useEffect(() => {
        const fetchBoardData = async () => {
            try {
                const response = await axios.get(`/api/board/${boardId}`);
                setBoardData(response.data);
                // 게시글 데이터를 가져오는 API 요청
                const postsResponse = await axios.get(`/api/posts?boardId=${boardId}`);
                setPosts(postsResponse.data);
            } catch (error) {
                console.error("게시판 데이터를 불러오는 중 오류 발생:", error);
            }
        };
        fetchBoardData();
    }, [boardId]);

    useEffect(() => {
        const fetchFollowData = async () => {
            try {
                const response = await axios.get(`/api/follow/${userId}`);
                // 팔로우 데이터를 받아와서 상태에 저장
            } catch (error) {
                console.error("팔로우 데이터를 불러오는 중 오류 발생:", error);
            }
        };
        fetchFollowData();
    }, [userId]);

    useEffect(() => {
        const fetchCategoryPosts = async () => {
            try {
                const response = await axios.get(`/api/category/${boardId}/posts`);
                setPosts(response.data);  // 받아온 게시글로 상태 업데이트
            } catch (error) {
                console.error("카테고리 게시글 불러오는 중 오류 발생:", error);
            }
        };
        if (boardId === "20") {
            fetchCategoryPosts();
        }
    }, [boardId]);
    
    

    // boardData가 null일 때 로딩 상태 또는 오류 처리
    if (!boardData) {
        return <div>게시판 데이터를 불러오는 중입니다...</div>;
    }
    
    //글쓰기 페이지로 이동
    const handleWriteClick = () => {
        navigate('/writting'); 
    };

    // 편집 모드 전환 함수
    const handleEditClick = () => {
        setIsEditing(prev => !prev);  // 편집 모드 토글
    };
    // 게시글 선택 함수
    const handlePostSelect = (postId) => {
        setSelectedPosts((prev) => {
            if (prev.includes(postId)) {
                // 이미 선택된 게시글은 선택 해제
                return prev.filter((id) => id !== postId);
            } else {
                // 선택되지 않은 게시글은 선택
                return [...prev, postId];
            }
        });
    };
    const handleDeleteClick = async () => {
        try {
            const response = await axios.delete('/api/posts', {
                data: { postIds: selectedPosts },
            });
            setPosts(posts.filter(post => !selectedPosts.includes(post.id)));
            setSelectedPosts([]); // 선택된 게시글 초기화
        } catch (error) {
            console.error("게시글 삭제 중 오류 발생:", error);
        }
    };
    
    

    // boardId === "13"일 때 팔로우 관리 화면으로
    if (boardId === "13") {
        return (
            <div className="follow-manager-wrapper">
                <Follow_manager />
            </div>
        );
    }

    // boardId === "20"일 때 카테고리별로 게시글을 보여주는 UI
    if (boardId.toString() === "20") {   
        return (
            <BoardCategoryView
                posts={posts}
                isEditing={isEditing}
                handlePostSelect={handlePostSelect}
                selectedPosts={selectedPosts}
            />
        );
    }

    return (
        <div>   {/*마이페이지에서 글 관리*/}
            {boardId === "12" && (
                <div className="button-container">
                <Button
                    text={isEditing ? "삭제" : "편집"}  // 편집 모드일 때 삭제로 바뀜
                    type="edit-delete"
                    onClick={isEditing ? handleDeleteClick : handleEditClick}  // 클릭 시 동작 변경
                />
            </div>
            )}
            <div className="all-posts"> 
                {posts.map((post) => (
                    <PostPreview key={post.id} post={post}
                        isEditing={isEditing}
                        onSelect={() => handlePostSelect(post.id)} // 게시글 선택 처리
                        isSelected={selectedPosts.includes(post.id)} // 선택된 게시글인지 확인
                        boardId={boardId}
                    />
                ))}
            </div>
            {/* 글쓰기 버튼 */}
            <Button 
                text="+"
                type="floating-btn"
                onClick={handleWriteClick}
            />
        </div>
    );
};
export default Board_Mypages;