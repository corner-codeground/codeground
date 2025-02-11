//게시판 탭(네비게이션)
import React from 'react';
import {Link} from 'react-router-dom';
import './BoardTabs.css';

const BoardTabs = () => { //링크 나중에 수정
    return (
        <div className="boardTab-bar"> 
            <ul>
                <li><Link to="/">프론트엔드</Link></li>
                <li><Link to="/">백엔드</Link></li>
                <li><Link to="/">보안</Link></li>
                <li><Link to="/">미디어</Link></li>
                <li><Link to="/">인공지능</Link></li>
                <li><Link to="/">임베디드 & IoT</Link></li>
                <li><Link to="/">블록체인 & 웹3</Link></li>
                <li><Link to="/">빅데이터</Link></li>
                <li><Link to="/">코드 그라운드</Link></li>
            </ul>
            <hr />
        </div>
        
    );
};
export default BoardTabs;