//계정 관리 페이지
import React, {useState} from 'react';
import './Set_userInfo.css';
import Button from '../../component/Button';
import {useNavigate} from "react-router-dom";

const Set_userInfo = () => {

    const [mode, setMode] = useState('light'); // 기본모드 상태

    const handleModeChange = (e) => {
        setMode(e.target.value); // 라디오 버튼 값에 따라 모드 변경
    };

    const navigate = useNavigate();
    
    return (
        <div className={`mypage-container ${mode === 'dark' ? 'dark-mode' : ''} ${mode === 'light' ? 'light-mode' : ''}`}>
            <div className="page-title">계정 관리</div>
            <hr className="mypage-separator" />

            <div className="form-section">
            <div className="change-img" style={{ backgroundImage: 'url(/default-profile.png)' }}></div>
            <form className="user-info-form">
                <div className="form-group">
                    <label htmlFor="username">닉네임</label>
                    <input type="text" id="username" name="username" placeholder="김코너" />
                </div>
                <div className="form-group">
                    <label htmlFor="userId">아이디</label>
                    <input type="text" id="userId" name="userId" placeholder="corner23" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">자기소개</label>
                    <input type="password" id="password" name="password" placeholder="안녕하세요! 김코너의 개발 블로그입니다~" />
                </div>
                {/* 라디오 버튼으로 다크 모드 및 기본 모드 설정 */}
                <div className="radio-container">
                    <div className="radio-option"> 
                        <span className="set-mode">다크모드 설정</span>
                        <label htmlFor="lightMode">기본 모드</label>
                            <input
                                type="radio"
                                id="lightMode"
                                name="mode"
                                value="light"
                                checked={mode === 'light'}
                                onChange={handleModeChange}
                                />
                    </div>
                    <div className="radio-option">
                        <label htmlFor="darkMode">다크 모드</label>
                            <input
                                type="radio"
                                id="darkMode"
                                name="mode"
                                value="dark"
                                checked={mode === 'dark'}
                                onChange={handleModeChange}
                            />
                    </div> 
                </div>
                <div className="form-buttons">
                    <Button type="back" text="취소" onClick={() => navigate("/account")} />
                    <Button type="save-btn" text="수정 완료" />
                </div>
            </form>
        </div>
    </div>
    );
};

export default Set_userInfo;