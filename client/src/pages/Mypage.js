import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Mypage.css";
import Profile from './userInfo_follow/Profile'; // 이미지 경로(임시)
import Mypage_BoardTab from '../component/Mypage_BoardTab';
import Board_Mypages from './board_pages/Board_Mypages';
import { useParams, useNavigate  } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_API_URL;

const Mypage = () => {
    const { boardId } = useParams();  // URL에서 boardId 가져오기
    const currentBoardId = boardId || "10";  // URL에 값이 없으면 기본값 10
    const navigate = useNavigate();

    // 프로필 데이터 상태
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);  // 데이터 로딩 상태
    const [error, setError] = useState(null);  // 오류 상태

    // 로그아웃 함수
    const handleLogout = () => {
        // 로그아웃 로직 필요 (세션/토큰 삭제 등)
        navigate("/login");  // 로그인 화면으로 이동
    };

    // 프로필 조회 API 호출
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem('token');  // 로컬 스토리지에서 토큰 가져오기
                const response = await axios.get(`${BASE_URL}/auth/profile`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // 토큰을 Authorization 헤더에 추가
                    },
                });
                setProfileData(response.data);  // 프로필 데이터 상태에 저장
            } catch (error) {
                setError('프로필 정보를 불러오는 데 실패했습니다.');
            } finally {
                setLoading(false);  // 로딩 완료
            }
        };

        fetchProfileData();
    }, []);

    // 로딩 중일 때, 오류가 있을 때, 또는 프로필 데이터가 없을 때 처리
    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="mypage-container">
            <div className="page-title">
                마이페이지
                <div className="goto-logout" onClick={handleLogout}>
                    로그아웃
                </div>
            </div>
            <hr className="mypage-separator" />
            <div className="profile-container">
                {/* 프로필 데이터를 Profile 컴포넌트로 전달 */}
                <Profile data={profileData} />
            </div>
            <div className="my-posts">
                <Mypage_BoardTab />
                <Board_Mypages boardId={currentBoardId} />
            </div>
        </div>            
    );
};

export default Mypage;
