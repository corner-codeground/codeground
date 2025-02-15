import React from "react";
import "./Account.css";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../component/Button";
//배열 이상한 거 css파일에서 수정
const Account = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // navigate로 전달된 state 값 받아오기
    const { username, userId, bio, mode } = location.state || {};

    return (
<div className="account-container">
    <div className="page-title">
            계정 관리</div>
            <hr className="mypage-separator"/>

            <div className="account-header">
                <img src="/default-profile.png" alt="프로필 사진" className="account-profile-img" />
                <div className="user-info"> 
                    <div className="user-name">
                        <div className="name-label">닉네임</div>
                        <div className="name-value">{username || '김코너'}</div> 
                    </div>
                    <div className="user-id">
                        <div className="id-label">아이디</div>
                        <div className="id-value">{userId || 'corner23'}</div>
                    </div>
                    <div className="introduce-myself-set">
                        <div className="bio-label">자기소개</div>
                        <div className="bio-value">{bio || '안녕하세요! 김코너의 블로그 입니다~'}</div>
                    </div>
                    <div className="mode-select">
                        <div className="mode-label">다크모드 설정</div>
                        <div className="mode-value">{mode === 'dark' ? '다크' : '기본'}</div>
                    </div>
                </div>
                <div className="drop-out">계정 탈퇴</div>
                <Button onClick={() => navigate("/profile-edit")} type="edit-account" text="수정">
                    프로필 수정
                </Button>
            </div>
        </div>
    );
};
export default Account;