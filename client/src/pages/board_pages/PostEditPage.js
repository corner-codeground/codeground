import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Writting from '../Writting'; // Writting 컴포넌트 임포트
//import { posts } from './Posts'; // 게시글 데이터를 임포트

const PostEditPage = () => {
    const { postId } = useParams(); // URL에서 postId 추출
    const [post, setPost] = useState(null); // 게시글 상태
    const navigate = useNavigate();

    useEffect(() => {
        // 백엔드 API에서 게시글 데이터를 가져오는 로직 (예: GET 요청)
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/posts/${postId}`);
                if (!response.ok) {
                    throw new Error('게시글을 불러오는 데 실패했습니다.');
                }
                const data = await response.json();
                setPost(data);
            } catch (error) {
                console.error('게시글 불러오기 실패:', error);
            }
        };
        fetchPost();
    }, [postId]);

    // 게시글이 로딩되지 않았으면 로딩 중 표시
    if (!post) {
        return <div>게시글을 불러오는 중...</div>;
    }

    // 게시글 수정 후 저장하는 함수
    const handleSave = async (updatedPost) => {
        try {
            // API를 통해 수정된 게시글 저장 (예: PUT 요청)
            const response = await fetch(`/api/posts/${postId}`, {
                method: 'PUT', // PUT 요청 사용
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPost), // 수정된 게시글 내용
            });

            if (response.ok) {
                const data = await response.json();
                console.log("게시글 수정 완료:", data);
                // 수정된 후에는 해당 게시글 상세 페이지로 리다이렉트
                navigate(`/post/${postId}`);
            } else {
                console.error('게시글 수정 실패');
            }
        } catch (error) {
            console.error("게시글 수정 중 오류 발생:", error);
        }
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
