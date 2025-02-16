//게시판 탭(네비게이션)
import React from 'react';
import {NavLink} from 'react-router-dom';
import './Mypage_BoardTab.css';

const Mypage_BoardTab = () => { //링크 나중에 수정
    return (
        <div className="myboardTab-bar"> 
            <ul>
                <li><NavLink to="/mypage/10"  className={({ isActive }) => (isActive ? 'active-link' : '')}>
                    내가 쓴 글</NavLink></li>
                <li><NavLink to="/mypage/11"  className={({ isActive }) => (isActive ? 'active-link' : '')}>
                    스크랩</NavLink></li>
                <li><NavLink to="/profile"  className={({ isActive }) => (isActive ? 'active-link' : '')}>
                    글 관리</NavLink></li>
                <li><NavLink to="/profile/following"  className={({ isActive }) => (isActive ? 'active-link' : '')}>
                    팔로우 관리</NavLink></li>
            </ul>
            <hr className="mypage-tab-separator"/>
        </div>
        
    );
};
export default Mypage_BoardTab;