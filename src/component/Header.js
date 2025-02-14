import React, { useState }from 'react';
import {Link} from 'react-router-dom';
import './Header.css';
import { FaSearch, FaBell, FaUser } from 'react-icons/fa'; // 헤더 아이콘

const Header = ({isLoggedIn}) => {
    // if (!isLoggedIn){
    //     return null; //로그인되지 않은 상황에서는 헤더 보이지 않음
    // }   -> 나중에 로그인 정보 저장한 후에 다시 주석 해제

    const [isSearchOpen, setIsSearchOpen] = useState(false); // 검색창 열기/닫기 상태
    const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen); // 검색창 상태 토글
    };

    return (
        <header>
        <div className="header-container">
            <div className="logo">
                <Link to="/">Code Ground</Link>
            </div>
            <div className="right">
                <div className="search" onClick={toggleSearch}>
                        <FaSearch size={20} color="white"/>
                </div>
                <div className="alrim">
                    <Link to="/alrim">
                        <FaBell size={20} /></Link>
                </div> 
                <div className="nav-links">
                    <div>
                        <Link to="/mypage/10">
                            <FaUser size={20} /></Link>
                    </div>
                </div>
                </div>
            </div>
            {/* 검색 입력 필드 */}
            <div className={`search-input-container ${isSearchOpen ? 'show' : ''}`}>
            <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="검색..."
                />
                {/* X 버튼 클릭 시 검색창 닫기 */}
                <button className="close-btn" onClick={toggleSearch}>X</button>
            </div>
        </header>
    );
};

export default Header;