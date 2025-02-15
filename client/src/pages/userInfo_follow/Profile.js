import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css"; 
import Button from '../../component/Button';

const Profile = ({ name, bio, isOwnProfile = true , following, follower}) => {
    const navigate = useNavigate();  // 페이지 이동 (계정 관리)

    // 사용자 사진과 닉네임 상태 관리
    const [user, setUser] = useState({
        name: name || "김코너",  // props로 전달된 name이 있으면 사용
        profilePic: "/default-profile.png",  // 기본 프로필 이미지 경로
        following: following || 5,  // 팔로잉 수 추가 (김코너의 경우 임시로 값 넣어 둠)
        follower: follower || 3,    // 팔로워 수 추가
    });

    // 팔로우 상태 관리 (true = 팔로잉, false = 팔로우 안 함)
    const [isFollowing, setIsFollowing] = useState(false);

    // 팔로우 버튼 클릭 핸들러
    const handleFollowClick = () => {
        setIsFollowing(true);
    };

    // 팔로잉 버튼 클릭 핸들러
    const handleUnfollowClick = () => {
        setIsFollowing(false);
    };

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
                        ) : (
                            null
                        )}
                    </div>
                </div>
            </div>
            <div className="followInfo-btn-container">
                <div className="follow-info">
                    {/* 팔로잉/팔로워 숫자 */}
                    <div className="following-num">팔로잉 {user.following}</div>
                    <div className="follower-num">팔로워 {user.follower}</div>
                </div>
                {!isOwnProfile && (
                    <div className="follow-btn-container">
                        {isFollowing ? (
                            <button 
                                className="following-btn" 
                                onClick={handleUnfollowClick}
                            >팔로잉</button>
                        ) : (
                            <button 
                                className="follow-btn" 
                                onClick={handleFollowClick}
                            >팔로우하기</button>
                        )}
                    </div>
                )}
            </div>

            {/* 자기소개(bio) 부분 */}
            <div className="introduce-myself">
                자기소개 | {bio || "김코너의 블로그."}  {/* bio 값이 없을 경우 기본 텍스트 표시 */}
            </div>
        </div>
    );
};

export default Profile;
