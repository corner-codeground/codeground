import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Writting from '../Writting'; // Writting 컴포넌트 임포트
import { posts } from './Posts'; // 게시글 데이터를 임포트

const PostEditPage = () => {
    const { postId } = useParams(); // URL에서 postId 추출
    const [post, setPost] = useState(null); // 게시글 상태

    useEffect(() => {
        // 게시글 데이터에서 postId에 맞는 게시글 찾기
        const foundPost = posts.find((post) => post.id === parseInt(postId));
        if (foundPost) {
            setPost(foundPost);
        }
    }, [postId]);

    // 게시글이 로딩되지 않았으면 로딩 중 표시
    if (!post) {
        return <div>게시글을 불러오는 중...</div>;
    }

    const handleSave = (updatedPost) => {
        // 수정된 게시글을 저장하는 로직 (API 호출 등)
        console.log("게시글 수정 완료:", updatedPost);
    };

    return (
        <div>
            <h1>게시글 수정</h1>
            {/* Writting 컴포넌트에 초기 제목과 내용 전달 */}
            <Writting 
                initialTitle={post.title} 
                initialContent={post.content} 
                onSave={handleSave} 
            />
        </div>
    );
};

export default PostEditPage;
