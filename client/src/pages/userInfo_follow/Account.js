import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Account.css";
import Button from "../../component/Button";
const BASE_URL = process.env.REACT_APP_API_URL;

const Account = () => {
    const navigate = useNavigate();
    
    const [userInfo, setUserInfo] = useState({
        username: '',
        userId: '',
        bio: '',
        mode: 'default',
        profilePic: '/default-profile.png'
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰 가져오기
                const response = await axios.get(`${BASE_URL}/auth/account`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // 토큰을 Authorization 헤더에 추가
                    },
                });
                // API 응답에 따른 사용자 정보 설정
                setUserInfo({
                    username: response.data.username || '김코너',
                    userId: response.data.userId || 'corner23',
                    bio: response.data.bio || '안녕하세요! 김코너의 블로그 입니다~',
                    mode: response.data.mode || 'default', // 다크모드 여부
                    profilePic: response.data.profilePic || '/default-profile.png'
                });
            } catch (error) {
                setError("계정 정보를 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="account-container">
            <div className="page-title">계정 관리</div>
            <hr className="mypage-separator" />

            <div className="account-header">
                <img src={userInfo.profilePic} alt="프로필 사진" className="account-profile-img" />
                <div className="user-info">
                    <div className="user-name">
                        <div className="name-label">닉네임</div>
                        <div className="name-value">{userInfo.username}</div>
                    </div>
                    <div className="user-id">
                        <div className="id-label">아이디</div>
                        <div className="id-value">{userInfo.userId}</div>
                    </div>
                    <div className="introduce-myself-set">
                        <div className="bio-label">자기소개</div>
                        <div className="bio-value">{userInfo.bio}</div>
                    </div>
                    <div className="mode-select">
                        <div className="mode-label">다크모드 설정</div>
                        <div className="mode-value">{userInfo.mode === 'dark' ? '다크' : '기본'}</div>
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
