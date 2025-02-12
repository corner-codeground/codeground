import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

const BoardPages = () => {
    const {boardId} = useParams(); //URL에서 boardId 가져오기
    const navigate = useNavigate();

    const [boardData, setBoardData] = useState(null); //게시판 데이터 상태 관리

    useEffect(() => {
        const fetchBoardData = async () => {
            const data = {
                1: { title: '프론트엔드', description: '이곳은 프론트엔드 게시판입니다.' },
                2: { title: '백엔드', description: '이곳은 백엔드 게시판입니다.' },
                3: { title: '보안 게시판', description: '이곳은 보안 게시판입니다.' },
                4: { title: '미디어 게시판', description: '이곳은 미디어 게시판입니다.' },
                5: { title: '인공지능 게시판', description: '이곳은 인공지능 게시판입니다.' },
                6: { title: '임베디드 & IoT 게시판', description: '이곳은 임베디드 & IoT 게시판입니다.' },
                7: { title: '블록체인 & 웹3 게시판', description: '이곳은 블록체인 & 웹3 게시판입니다.' },
                8: { title: '빅데이터 게시판', description: '이곳은 빅데이터 게시판입니다.' },
                9: { title: '코드그라운드 게시판', description: '이곳은 코드그라운드 게시판입니다.' },
            };

            setBoardData(data[boardId]);    //boardId에 맞는 데이터 설정
        };
        fetchBoardData();
    }, [boardId]); //boardId 변경될 때마다 데이터 재로딩

    // boardData가 null일 때 로딩 상태 또는 오류 처리
    if (!boardData) {
        return <div>게시판 데이터를 불러오는 중입니다...</div>;
    }

    return (
        <div className="board-content">
            <h1>{boardData.title}</h1>
            <p>{boardData.description}</p>
        </div>
    );
};
export default BoardPages;