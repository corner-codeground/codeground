import React, { useState }from 'react';
import {Link} from 'react-router-dom';
import './Header.css';
import { FaSearch, FaBell, FaUser } from 'react-icons/fa'; // 헤더 아이콘
import Notification from './Notification';

const Header = ({isLoggedIn}) => {
    // if (!isLoggedIn){
    //     return null; //로그인되지 않은 상황에서는 헤더 보이지 않음
    // }   -> 나중에 로그인 정보 저장한 후에 다시 주석 해제

    const [isSearchOpen, setIsSearchOpen] = useState(false); // 검색창 열기/닫기 상태
    const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태
    // 임시 데이터로 최근 검색어 목록을 설정
    const [recentSearches, setRecentSearches] = useState([
        'React',
        'JavaScript',
        'CSS Flexbox',
        'Node.js',
        'Express'
    ]);

    const [isNotificationOpen, setIsNotificationOpen] = useState(false); // 알림창 열기/닫기 상태

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen); // 검색창 상태 토글
    };
    const handleSearch = () => {
        if (searchQuery.trim()) {
            setRecentSearches(prevSearches => {
                const updatedSearches = [searchQuery, ...prevSearches].slice(0, 5); // 최근 5개만 저장
                return updatedSearches;
            });
            alert(`검색어: ${searchQuery}`); // 실제 검색 로직을 여기에 추가할 수 있습니다.
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const toggleNotification = () => {
        setIsNotificationOpen(!isNotificationOpen); // 알림창 상태 토글
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
                <div className="alrim" onClick={toggleNotification}>
                    <FaBell size={20} color="white" />
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
                    onChange={handleSearchChange}
                    placeholder="해시태그 or 키워드 검색"
                />
                {/* 검색 버튼 클릭 시 검색 */}
                <button className="searching-btn" onClick={handleSearch}>검색</button>
            
                {/* 최근 검색어 목록 */}
                {isSearchOpen && recentSearches.length > 0 && (
                    <div className="recent-searches">
                        <span className="recent-search-label">최근 검색 |</span> 
                        <ul className="recent-searches-list">
                            {recentSearches.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* 알림 창 (오른쪽 상단에 위치) */}
            {isNotificationOpen && <Notification />}
            
        </header>
    );
};

export default Header;