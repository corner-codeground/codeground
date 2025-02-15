import React from "react";
import PostPreview from './PostPreview';
import { useParams } from "react-router-dom";

const BoardCategoryView = ({ posts}) => {
    const { boardId } = useParams();

    // boardId에 맞는 게시물만 필터링하는 함수
    const filterPostsByBoardId = () => {
        return posts.filter(post => post.boardId === parseInt(boardId)); // boardId가 일치하는 게시물만 필터링
    };

    const filteredPosts = filterPostsByBoardId();

    return (
        <div>
            {/* 필터링된 게시물이 없으면 메시지 표시 */}
            {filteredPosts.length === 0 ? (
                <p>게시물이 없습니다.</p>
            ) : (
                <div className="all-posts">
                    {filteredPosts.map((post) => (
                        <PostPreview
                            key={post.id}
                            post={post}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BoardCategoryView;