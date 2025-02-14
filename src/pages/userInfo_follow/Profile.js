import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css"; 
import Button from '../../component/Button';

const Profile = ({ name, bio, isOwnProfile = true }) => {
    const navigate = useNavigate();  // 페이지 이동 (계정 관리)

    // 사용자 사진과 닉네임 상태 관리
    const [user, setUser] = useState({
        name: name || "김코너",  // props로 전달된 name이 있으면 사용
        profilePic: "/default-profile.png",  // 기본 프로필 이미지 경로
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

                <div className="follow-info">
                    {/* 팔로잉/팔로워 숫자 (하드코딩된 예시 값) */}
                    <div className="following-num">팔로잉 5</div>
                    <div className="follower-num">팔로워 3</div>
                </div>

                {/* 팔로우 버튼을 오른쪽 끝에 배치 */}
                {!isOwnProfile && (
                    <div className="follow-btn-container">
                        {isFollowing ? (
                            <Button 
                                className="following-btn" 
                                onClick={handleUnfollowClick} 
                                type="following-btn" 
                                text="팔로잉"
                            />
                        ) : (
                            <Button 
                                className="follow-btn" 
                                onClick={handleFollowClick} 
                                type="follow-btn" 
                                text="팔로우"
                            />
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
