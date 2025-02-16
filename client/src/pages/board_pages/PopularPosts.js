import React, { useState, useEffect } from 'react';
//import {posts} from './Posts';
import './PopularPosts.css';
import axios from 'axios'; // axios를 사용하여 API 호출

const PopularPosts = () => {
    const [popularPosts, setPopularPosts] = useState([]); // 게시글 데이터 상태
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    const [error, setError] = useState(null); // 오류 상태 관리
    // 앞에서부터 3개만 자르기 (좋아요 순으로 데이터 가정)
    //const topPosts = popularPosts.slice(0, 3);

    useEffect(() => {
        const fetchPopularPosts = async () => {
            try {
                // 서버에서 인기글 데이터를 가져오는 API 호출
                const response = await axios.get('/api/popular-posts'); // 해당 URL은 예시
                setPopularPosts(response.data); // 가져온 데이터로 상태 업데이트
            } catch (err) {
                setError('인기글을 불러오는 데 실패했습니다.');
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        fetchPopularPosts();
    }, []); // 컴포넌트가 처음 렌더링될 때만 실행

// 로딩 상태 처리
if (loading) {
    return <div>로딩 중...</div>;
}

// 오류 상태 처리
if (error) {
    return <div>{error}</div>;
}

// topPosts: 인기글 상위 3개
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