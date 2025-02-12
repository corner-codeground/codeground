//게시판 탭(네비게이션)
import React from 'react';
import {Link} from 'react-router-dom';
import './BoardTabs.css';

const BoardTabs = () => { //링크 나중에 수정
    return (
        <div className="boardTab-bar"> 
            <ul>
                <li><Link to="/board_pages/1">프론트엔드</Link></li>
                <li><Link to="/board_pages/2">백엔드</Link></li>
                <li><Link to="/board_pages/3">보안</Link></li>
                <li><Link to="/board_pages/4">미디어</Link></li>
                <li><Link to="/board_pages/5">인공지능</Link></li>
                <li><Link to="/board_pages/6">임베디드 & IoT</Link></li>
                <li><Link to="/board_pages/7">블록체인 & 웹3</Link></li>
                <li><Link to="/board_pages/8">빅데이터</Link></li>
                <li><Link to="/board_pages/9">코드 그라운드</Link></li>
            </ul>
            <hr />
        </div>
        
    );
};
export default BoardTabs;