import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HashtagList from '../../component/HashtagList';
import Button from '../../component/Button';
import DateDisplay from '../../component/DateDisplay';
import { posts } from './Posts';
import './PostDetail.css';
import { Bookmark } from "lucide-react";
import CommentSection from './CommentSection';

const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [codeResult, setCodeResult] = useState(null); // 코드 실행 결과 상태
    const [showResult, setShowResult] = useState(false); // 실행 결과 표시 여부 상태
    const [scrapped, setScrapped] = useState(false);  // 스크랩 상태

    // 사용자 정보 (닉네임, 사진)
    const user = {
        name: "김코너",
        profilePic: "/default-profile.png",
    };
    
    const navigate = useNavigate();

    useEffect(() => {
        // posts 배열에서 postId에 맞는 데이터 찾기
        const foundPost = posts.find((post) => post.id === parseInt(postId)); // postId는 문자열일 수 있으므로 parseInt
        if (foundPost) {
            setPost(foundPost);
        }
    }, [postId]);

    if (!post) {
        return <div>포스트 데이터를 불러오는 중...</div>;
    }

    // 코드 블록을 찾는 정규식 (예: ```code```)
    const extractCodeBlocks = (content) => {
        const regex = /```([\s\S]*?)```/g; // ` ``` ` 코드 블록을 찾는 정규식
        const matches = [];
        let match;

        while ((match = regex.exec(content)) !== null) {
            matches.push(match[1]); // 코드 블록 내용만 추출
        }

        return matches;
    };

    const handleCodeRun = () => {
        try {
            // post.code 안의 코드를 실행하고 결과를 setCodeResult에 저장
            const result = eval(post.code);
            setCodeResult(result);
            setShowResult(true); // 실행 후 결과를 표시하도록 설정
        } catch (error) {
            setCodeResult('코드 실행 중 오류가 발생했습니다.');
            setShowResult(true); // 오류가 나더라도 결과 영역은 표시
        }
    };

    // content에서 코드 블록 추출
    const codeBlocks = extractCodeBlocks(post.content);
    // content를 코드 블록을 포함해 표시하기
    const contentWithCodeBlocks = post.content.split('```').map((part, index) => {
        if (index % 2 === 1) {
            return (
                <div className="code-block" key={index}>
                    <pre>
                        <code>{part}</code>
                    </pre>
                </div>
            );
        } else {
            return <div className="content-posting" key={index}>{part}</div>;
        }
    });

    // 임의로 해시태그 설정 (예시)
    const exampleHashtags = ['#리액트', '#프론트엔드', '#웹개발'];

    // 내 게시글인 경우, 수정/삭제 버튼 추가
    const isAuthor = user.name === post.author;

    const handleEdit = () => {
        // 수정 로직 (예: 모달을 띄우거나 다른 페이지로 이동)
        console.log("수정 버튼 클릭");
        navigate(`/post-edit/${post.id}`);
    };

    const handleDelete = () => {
        // 삭제 로직 (예: API 호출로 게시글 삭제)
        console.log("삭제 버튼 클릭");
    };

    return (
        <div className="whole-page">
            <div className="title-container">
                <div className="this-post-title">{post.title}</div>
                {/* 내 게시글인 경우 수정/삭제 버튼 표시 */}
                {isAuthor && (
                    <div className="post-actions">
                        <button onClick={handleEdit} className="scrap-btn">수정</button>
                        <button onClick={handleDelete} className="scrap-btn">삭제</button>
                    </div>
                )}
                {/* 스크랩 버튼 */}
                <button onClick={() => setScrapped(!scrapped)} className="scrap-btn">
                    <Bookmark size={30} color={scrapped ? "#7FA1C3" : "black"} fill={scrapped ? "#7FA1C3" : "none"} />
                </button>
            </div>
            <div className="this-post-author">{post.author}</div>
            <div className="post-date_hashtag">
                <span className="post-date">{post.date}</span>
                <span className="post-hashtag"><HashtagList hashtags={exampleHashtags} /></span>
            </div>
            <hr className="content-separator" />
            <div className="post-content-box">
                {contentWithCodeBlocks}
                <div className="button-container">
                    <Button type="code-run" text="실행" onClick={handleCodeRun} />
                </div>
                {/* 실행 결과 출력 */}
                {showResult && (
                    <div className="code-block-run">
                        <pre>
                            <code>{codeResult !== null ? codeResult : '결과를 실행해주세요.'}</code>
                        </pre>
                    </div>
                )}
            </div>

            <div className="comment">
                <hr className="content-separator" />
                {/* 댓글 컴포넌트에 사용자 정보 전달 */}
                <CommentSection user={user} />
            </div>
        </div>
    );
};

export default PostDetail;
