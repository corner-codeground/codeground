import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

const Header = ({isLoggedIn}) => {
    if (!isLoggedIn){
        return null; //로그인되지 않은 상황에서는 헤더 보이지 않음
    }

    return (
        <header>
        <div className="header-container">
            <div className="logo">
                <Link to="/">Code Ground</Link>
            </div>
            <div className="right">
                <div className="search">
                    <Link to="/search">돋보기</Link>
                </div>
                <div className="alrim">
                    <Link to="/alrim">알림</Link>
                </div> 
                <div className="nav-links">
                    <div>
                        <Link to="/mypage">마이페이지</Link>
                    </div>
                </div>
                </div>
            </div>
        </header>
    );
};

export default Header;