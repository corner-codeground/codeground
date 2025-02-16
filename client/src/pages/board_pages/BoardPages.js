import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import BoardTabs from "../../component/BoardTabs";
import PostPreview from './PostPreview';
import Button from '../../component/Button';
//import {posts as allPosts} from './Posts';
import {FaSearch} from "react-icons/fa";
import './BoardPages.css';
import axios from 'axios';  // axios import

const BoardPages = () => {
    const {boardId} = useParams(); //URL에서 boardId 가져오기
    const navigate = useNavigate();

    const [boardData, setBoardData] = useState(null); //게시판 데이터 상태 관리
    const [posts, setPosts] = useState(); // 게시글 상태 관리
    const [topPosts, setTopPosts] = useState([]); // 인기글 상태 관리

    const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태(게시판내 검색)
    
    const [loading, setLoading] = useState(true); // 데이터 로딩 상태 관리
    const [error, setError] = useState(null); // 에러 상태 관리

    // 게시판 데이터 불러오기
    useEffect(() => {
        const fetchBoardData = async () => {
            try {
                const response = await axios.get(`/api/boards/${boardId}`);
                setBoardData(response.data);
            } catch (error) {
                setError("게시판 데이터를 불러오는 중 오류가 발생했습니다.");
                console.error("게시판 데이터 불러오기 실패", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBoardData();
    }, [boardId]);


     // 게시글 데이터 불러오기
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`/api/posts?boardId=${boardId}`);
                setPosts(response.data);
            } catch (error) {
                setError("게시글 데이터를 불러오는 중 오류가 발생했습니다.");
                console.error("게시글 불러오기 실패", error);
            }
        };
        fetchPosts();
    }, [boardId]);

    // boardData가 null일 때 로딩 상태 또는 오류 처리
    if (!boardData) {
        return <div>게시판 데이터를 불러오는 중입니다...</div>;
    }
    //글쓰기 페이지로 이동
    const handleWriteClick = () => {
        navigate('/writting'); 
    };

    const handleSearch = () => {
        if (searchQuery.trim()) {
            alert(`검색어: ${searchQuery}`); // 실제 검색 로직을 여기에 추가
        }
    };
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value); //검색어 상태 변경
    };

    return (
        <div>
            <BoardTabs />
            <div className="explain-board">
                게시판 TOP 3 
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="게시판 내에서 검색하기"
                    />
                    <button onClick={handleSearch} className="inBoard-searching-btn">
                        <FaSearch color={"#7FA1C3"} />
                    </button>
                <br /> 

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