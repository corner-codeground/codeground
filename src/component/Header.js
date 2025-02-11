import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';
import { FaSearch, FaBell, FaUser } from 'react-icons/fa'; // 헤더 아이콘

const Header = ({isLoggedIn}) => {
    // if (!isLoggedIn){
    //     return null; //로그인되지 않은 상황에서는 헤더 보이지 않음
    // }   -> 나중에 로그인 정보 저장한 후에 다시 주석 해제

    return (
        <header>
        <div className="header-container">
            <div className="logo">
                <Link to="/">Code Ground</Link>
            </div>
            <div className="right">
                <div className="search">
                    <Link to="/search">
                        <FaSearch size={20} /></Link>
                </div>
                <div className="alrim">
                    <Link to="/alrim">
                        <FaBell size={20} /></Link>
                </div> 
                <div className="nav-links">
                    <div>
                        <Link to="/mypage">
                            <FaUser size={20} /></Link>
                    </div>
                </div>
                </div>
            </div>
        </header>
    );
};

export default Header;