import React, { useState } from 'react';
import {posts} from './Posts';
import './PopularPosts.css';

const PopularPosts = () => {
    const [popularPosts, setPopularPost] = useState([ //임시 데이터 사용
        {
            id: 1,
            title: "인기글 제목", 
            date: "2025-02-14",
        },
        {
            id: 2,
            title: "인기글 제목", 
            date: "2025-02-14",
        },
        {
            id: 3,
            title: "인기글 제목", 
            date: "2025-02-14",
        },
        {
            id: 4,
            title: "인기글 제목", 
            date: "2025-02-14",
        }
    ]);
    // 앞에서부터 3개만 자르기 (좋아요 순으로 데이터 가정)
    const topPosts = popularPosts.slice(0, 3);

    return (
        <div className="popular-posts-content">
            <div className="popular-content-title">이 게시판의 인기글</div>
            <ul>  
                {topPosts.map(post => (
                    <li key={post.id}>
                        <div className="popular-post-title">{post.title}</div>
                        <div className="popular-post-date">{post.date}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PopularPosts;