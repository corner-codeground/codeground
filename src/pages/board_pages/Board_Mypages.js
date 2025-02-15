import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import PostPreview from './PostPreview';
import Button from '../../component/Button';
import {posts as allPosts} from './Posts';  //일단 allPosts 이용
import Follow_manager from '../userInfo_follow/Follow_manager';
import BoardCategoryView from "./BoardCategoryView";
import './BoardPages.css';

const Board_Mypages = ({ boardId }) => {
    const navigate = useNavigate();

    const [boardData, setBoardData] = useState(null); //게시판 데이터 상태 관리
    const [posts, setPosts] = useState([]); // 게시글 상태 관리

    const [selectedPosts, setSelectedPosts] = useState([]); // 선택된 게시글 관리
    const [isEditing, setIsEditing] = useState(false); // 편집 모드 상태

    useEffect(() => { //게시판 데이터 불러오기
        const fetchBoardData = async () => {
            const data = {
                10: { title: '내가 쓴 글', description: '내 게시물.' },
                11: { title: '스크랩', description: '스크랩한 글들.' },
                12: { title: '글 관리', description: '글 관리.' },
                13: { title: '팔로우 관리', description: '팔로우 관리.' },
                20: { title: '카테고리', description: '다른 사람 계정에서 카테고리별 게시판'}
            };

            setBoardData(data[boardId]);    //boardId에 맞는 데이터 설정
            console.log(data[boardId]);  // boardData 확인

            // // boardId에 맞는 게시글 데이터를 필터링
            // const filteredPosts = allPosts.filter(post => post.boardId === parseInt(boardId));
            setPosts(allPosts); //일단 allposts
            // console.log(filteredPosts);  // 필터링된 게시글 확인
        };
        fetchBoardData();
    }, [boardId]); //boardId 변경될 때마다 데이터 재로딩

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
    // 선택된 게시글 삭제 함수
    const handleDeleteClick = () => {
        const updatedPosts = posts.filter((post) => !selectedPosts.includes(post.id));
        setPosts(updatedPosts);
        setSelectedPosts([]); // 삭제 후 선택된 게시글 초기화
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
    if (boardId === "20") {   
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