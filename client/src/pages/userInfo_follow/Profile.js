import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Profile.css"; 
import Button from '../../component/Button';

const BASE_URL = process.env.REACT_APP_API_URL;

const Profile = ({ isOwnProfile = true }) => {
    const navigate = useNavigate();  // 페이지 이동 (계정 관리)

    // 사용자 사진과 닉네임, 팔로우/팔로잉 수 상태 관리
    const [user, setUser] = useState({
        name: "김코너",  // 기본 값
        profilePic: "/default-profile.png",  // 기본 프로필 이미지 경로
        following: 0,  // 팔로잉 수
        follower: 0,    // 팔로워 수
        bio: "김코너의 블로그.",  // 기본 자기소개
    });
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);

    // 로그인한 사용자의 프로필 조회 API
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem('token');  // 로컬 스토리지에서 토큰 가져오기
                const response = await axios.get(`${BASE_URL}/auth/profile/:id`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // 토큰을 Authorization 헤더에 추가
                    },
                });
                // API 응답에 따라 사용자 정보 업데이트
                setUser({
                    name: response.data.name,
                    profilePic: response.data.profilePic || "/default-profile.png",  // 이미지 없으면 기본 이미지
                    following: response.data.followingCount || 0,
                    follower: response.data.followerCount || 0,
                    bio: response.data.bio || "김코너의 블로그.",  // bio가 없으면 기본 텍스트
                });
            } catch (error) {
                setError("프로필 정보를 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    // 팔로우 상태 관리
    const handleFollowClick = () => {
        setIsFollowing(true);
        // 여기서 백엔드 API를 호출하여 팔로우 상태를 서버에 반영할 수 있습니다.
    };

    const handleUnfollowClick = () => {
        setIsFollowing(false);
        // 여기서 백엔드 API를 호출하여 팔로우 취소 상태를 서버에 반영할 수 있습니다.
    };

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-user-info">
                    <img src={user.profilePic} alt="프로필 이미지" className="profile-img" />
                    <div className="user-details">
                        <div className="user-name">{user.name}</div>
                        {isOwnProfile ? (
                            <Button 
                                className="setting-account" 
                                onClick={() => navigate("/account")} 
                                type="set-account-btn" 
                                text="⚙️계정 관리" 
                            />
                        ) : null}
                    </div>
                </div>
            </div>
            <div className="followInfo-btn-container">
                <div className="follow-info">
                    <div className="following-num">팔로잉 {user.following}</div>
                    <div className="follower-num">팔로워 {user.follower}</div>
                </div>
                {!isOwnProfile && (
                    <div className="follow-btn-container">
                        {isFollowing ? (
                            <button 
                                className="following-btn" 
                                onClick={handleUnfollowClick}
                            >
                                팔로잉
                            </button>
                        ) : (
                            <button 
                                className="follow-btn" 
                                onClick={handleFollowClick}
                            >
                                팔로우하기
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* 자기소개 부분 */}
            <div className="introduce-myself">
                자기소개 | {user.bio}
            </div>
        </div>
    );
};

export default Profile;
