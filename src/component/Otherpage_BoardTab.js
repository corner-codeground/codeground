import React from 'react';
import { NavLink } from 'react-router-dom';
import './Mypage_BoardTab.css';

const Otherpage_BoardTab = () => {
    return (
        <div className="myboardTab-bar"> 
            <ul>
                {/* 전체 탭은 현재 페이지로 링크 설정 */}
                <li>
                    <NavLink to="." className={({ isActive }) => (isActive ? 'active-link' : '')}>
                        전체
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/profile/:userId/category" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                        카테고리
                    </NavLink>
                </li>
            </ul>
            <hr className="mypage-tab-separator"/>
        </div>
    );
};

export default Otherpage_BoardTab;
