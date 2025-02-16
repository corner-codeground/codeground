import React, { useEffect, useState } from 'react';
import './Account.css';
import { useNavigate } from 'react-router-dom';
import Button from '../../component/Button';
import axios from 'axios'; // axios 임포트

const BASE_URL = process.env.REACT_APP_API_URL;

const Account = () => {
    const [userInfo, setUserInfo] = useState(null);  // 초기값을 null로 설정
    const [loading, setLoading] = useState(true);    // 로딩 상태 관리
    const [error, setError] = useState(null);        // 에러 상태 관리
    const navigate = useNavigate();

    useEffect(() => {
        // GET 요청을 통해 계정 정보 가져오기
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/auth/account`);
                setUserInfo(response.data); // 응답 받은 데이터를 상태에 저장
            } catch (error) {
                setError('계정 정보 조회 실패');
                console.error("계정 정보 조회 실패:", error);
            } finally {
                setLoading(false); // 데이터 로딩 완료
            }
        };

        fetchUserInfo();
    }, []);

    if (loading) {
        return <div>로딩 중...</div>;  // 로딩 중일 때 화면에 표시
    }

    if (error) {
        return <div>{error}</div>;  // 에러가 있을 때 화면에 표시
    }

    const { username, userId, bio, mode, profileImage } = userInfo || {};  // userInfo가 없을 경우 대비

    const handleAccountDelete = () => {
        // 계정 탈퇴 로직 구현
        // 예시로 확인창을 띄운 후 탈퇴 진행
        const confirmDelete = window.confirm("정말로 계정을 탈퇴하시겠습니까?");
        if (confirmDelete) {
            // 계정 탈퇴 API 호출 등
            console.log("계정 탈퇴 진행...");
        }
    };

    return (
        <div className="account-container">
            <div className="page-title">계정 관리</div>
            <hr className="mypage-separator" />

            <div className="account-header">
                <img
                    src={profileImage || "/default-profile.png"}  // 프로필 이미지 설정
                    alt="프로필 사진"
                    className="account-profile-img"
                />
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
                <div className="drop-out" onClick={handleAccountDelete}>
                    계정 탈퇴
                </div>
                <Button onClick={() => navigate("/profile-edit")} type="edit-account" text="수정">
                    프로필 수정
                </Button>
            </div>
        </div>
    );
};

export default Account;
