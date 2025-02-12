import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import BoardTabs from '../component/BoardTabs';
import PostPreview from './board_pages/PostPreview';
import './Home.css';
import Button from '../component/Button';
import { posts } from './board_pages/Posts.js'; // 경로 수정

const Home= () => {
    const navigate = useNavigate();

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