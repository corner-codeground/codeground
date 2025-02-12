import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import BoardTabs from '../component/BoardTabs';
import PostPreview from '../component/PostPreview';
import './Home.css';

const Home= () => {
    const navigate = useNavigate();

    // 임시 게시글 데이터 추가 - 나중에 데이터 연동 후 수정 필요
    const posts = [
        {   
            id: 1,
            title: "리액트 로드맵",
            //description: ,
            author: "프론트엔드 천재",
            date: "2025-02-16",
            thumbnail: "image1.jpg"
            //이미지 추후에 로고로 수정 등
        },
        {
            id: 2,
            title: "React로 블로그 만들기",
           // description: "React를 이용한 블로그 제작 방법",
            author: "감귤귤",
            date: "2025-02-14",
            thumbnail: "image2.jpg" 
        },
        {   
            id: 3,
            title: "리액트 로드맵",
            //description: ,
            author: "프론트엔드 천재",
            date: "2025-02-16",
            thumbnail: "image1.jpg"
        },
        {   
            id: 4,
            title: "리액트 로드맵",
            //description: ,
            author: "프론트엔드 천재",
            date: "2025-02-16",
            thumbnail: "image1.jpg"
            //이미지 추후에 로고로 수정 등
        },
        {
            id: 5,
            title: "React로 블로그 만들기",
           // description: "React를 이용한 블로그 제작 방법",
            author: "감귤귤",
            date: "2025-02-14",
            thumbnail: "image2.jpg" 
        },
        {   
            id: 6,
            title: "리액트 로드맵",
            //description: ,
            author: "프론트엔드 천재",
            date: "2025-02-16",
            thumbnail: "image1.jpg"
        }
    ];
    
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
        </div>
    );
};

export default Home;