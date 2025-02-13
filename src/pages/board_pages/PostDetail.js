// 게시글 상세 내용
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HashtagList from '../../component/HashtagList';
import Button from '../../component/Button';
import DateDisplay from '../../component/DateDisplay';
import Writting from '../../pages/Writting';
import { posts } from './Posts';
import './PostDetail.css'

const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [codeResult, setCodeResult] = useState(null); // 코드 실행 결과 상태
    const [showResult, setShowResult] = useState(false); // 실행 결과 표시 여부 상태

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
            return <span key={index}>{part}</span>;
        }
    });


    // 임의로 해시태그 설정 (예시)
    const exampleHashtags = ['#리액트', '#프론트엔드', '#웹개발'];

    return (
        <div className="whole-page">
            <div className="this-post-title">{post.title}</div>
            <div className="this-post-author">{post.author}</div>
            <div className="post-date_hashtag">
                <span className="post-date">{post.date}</span>
                <span className="post-hashtag"><HashtagList hashtags={exampleHashtags}/></span>
            </div>
            <hr className="content-separator"/>
            <div className="post-content-box">
                {post.content}
                {/* 코드 블록 표시 - 실제로 보여지는 하이라이팅은 라이브러리 사용*/}
                <div className="code-block">
                    <pre>
                        <code>{post.code}</code>
                    </pre>
                </div>
                <Button type="code-run" text="실행" onClick={handleCodeRun}/>
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
                <hr className="content-separator"/>
                </div>
        </div>
    );
};

export default PostDetail;