import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import BoardTabs from "../../component/BoardTabs";
import PostPreview from './PostPreview';
import Button from '../../component/Button';
import {posts as allPosts} from './Posts';
import './BoardPages.css';

const BoardPages = () => {
    const {boardId} = useParams(); //URL에서 boardId 가져오기
    const navigate = useNavigate();

    const [boardData, setBoardData] = useState(null); //게시판 데이터 상태 관리
    const [posts, setPosts] = useState(); // 게시글 상태 관리
    const [topPosts, setTopPosts] = useState([]); // 인기글 상태 관리

    useEffect(() => { //게시판 데이터 불러오기
        const fetchBoardData = async () => {
            const data = {
                1: { title: '프론트엔드', description: '이곳은 프론트엔드 게시판입니다.' },
                2: { title: '백엔드', description: '이곳은 백엔드 게시판입니다.' },
                3: { title: '보안 게시판', description: '이곳은 보안 게시판입니다.' },
                4: { title: '미디어 게시판', description: '이곳은 미디어 게시판입니다.' },
                5: { title: '인공지능 게시판', description: '이곳은 인공지능 게시판입니다.' },
                6: { title: '임베디드 & IoT 게시판', description: '이곳은 임베디드 & IoT 게시판입니다.' },
                7: { title: '블록체인 & 웹3 게시판', description: '이곳은 블록체인 & 웹3 게시판입니다.' },
                8: { title: '빅데이터 게시판', description: '이곳은 빅데이터 게시판입니다.' },
                9: { title: '코드그라운드 게시판', description: '이곳은 코드그라운드 게시판입니다.' },
            };

            setBoardData(data[boardId]);    //boardId에 맞는 데이터 설정
            console.log(data[boardId]);  // boardData 확인

            // // boardId에 맞는 게시글 데이터를 필터링 (우선 allPosts 이용)
            const filteredPosts = allPosts.filter(post => post.boardId === parseInt(boardId));
            //setPosts(filteredPosts);
            setPosts(allPosts);
            //setPosts(filteredPosts); // 게시글 필터링 후 상태 관리
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
            <BoardTabs />
            <div className="explain-board">
                게시판 TOP 3 <br />
                <div className="post-preview-container">
                    <div className="top-posts">
                    {posts.slice(0, 3).map((post) => (   // 임시로 첫 3개 포스트만 표시(좋아요 순으로 정렬 가정)
                        <PostPreview key={post.id} post={post} />
                    ))}
                    </div>
                    <hr className="separator" />
                    <div className="all-posts"> 
                    {posts.map((post) => (
                        <PostPreview key={post.id} post={post} />
                    ))}
                    </div>
                </div>
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
export default BoardPages;