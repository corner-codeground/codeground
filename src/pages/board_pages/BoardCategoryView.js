import React, { useState } from "react";
import PostPreview from './PostPreview';
import './BoardCategoryView.css';

const BoardCategoryView = ({ posts, category }) => {
    // 포스트 데이터를 카테고리별로 그룹화
    const groupedPosts = posts.reduce((acc, post) => {
        if (!acc[post.category]) {
            acc[post.category] = []; // 카테고리가 없으면 새로운 배열을 생성
        }
        acc[post.category].push(post); // 해당 카테고리 배열에 포스트 추가
        return acc;
    }, {});

    return (
        <div>
            {Object.keys(groupedPosts).map(category => (
                <div key={category} className="category-section">
                    <div className="category-header">
                        <div className="post-category-title">{category}</div>
                        <CategoryPosts posts={groupedPosts[category]} />
                    </div>
                </div>
            ))}
        </div>
    );
};

const CategoryPosts = ({ posts }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const visiblePosts = isExpanded ? posts : posts.slice(0, 3); // 3개까지만 보이도록

    const handleToggleExpand = () => {
        setIsExpanded(prev => !prev);  // 더보기 버튼 클릭 시 상태 변경
    };

    return (
        <div>
            <div className="board-category-container">
                {visiblePosts.map(post => (
                    <PostPreview
                        key={post.id}
                        post={post}
                    />
                ))}
            </div>
            {posts.length > 3 && (
                <button onClick={handleToggleExpand} className="load-more-btn">
                    {isExpanded ? '간략히 보기' : '더보기'}
                </button>
            )}
        </div>
    );
};

export default BoardCategoryView;
