import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import BoardTabs from "../../component/BoardTabs";
import PostPreview from './PostPreview';
import Button from '../../component/Button';
import {posts as allPosts} from './Posts';
import './BoardPages.css';

const Board_Mypages = ({ boardId }) => {
    const navigate = useNavigate();

    const [boardData, setBoardData] = useState(null); //게시판 데이터 상태 관리
    const [posts, setPosts] = useState([]); // 게시글 상태 관리

    useEffect(() => { //게시판 데이터 불러오기
        const fetchBoardData = async () => {
            const data = {
                10: { title: '내가 쓴 글', description: '내 게시물.' },
                11: { title: '스크랩', description: '스크랩한 글들.' },
                12: { title: '글 관리', description: '글 관리.' },
                13: { title: '팔로우 관리', description: '팔로우 관리.' },
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

    return (
        <div>
            <div className="all-posts"> 
                {posts.map((post) => (
                    <PostPreview key={post.id} post={post} />
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