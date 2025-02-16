import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import BoardTabs from '../component/BoardTabs';
import PostPreview from './board_pages/PostPreview';
import './Home.css';
import Button from '../component/Button';
import axios from 'axios'; // Axios 사용

const Home= () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

     // API 호출하여 게시글 목록 가져오기
    useEffect(() => {
        axios.get('/posts')
            .then(response => {
                setPosts(response.data); // API 응답 데이터를 상태에 저장
            })
            .catch(error => {
                console.error("게시글을 불러오는 중 오류 발생:", error);
            });
    }, []);

    //글쓰기 페이지로 이동
    const handleWriteClick = () => {
        navigate('/writting'); 
    };
    
    return (
        <div>
            <BoardTabs />
            <div className="explain-board">
                전체 인기글 <br />
                <div className="post-preview-container">
                    {posts.map((post) => (
                        <PostPreview key={post.id} post={post} />
                    ))}
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

export default Home;