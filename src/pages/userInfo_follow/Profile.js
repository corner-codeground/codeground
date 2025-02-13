//계정 관리 화면
import React from "react";
import {useNavigate} from "react-router-dom";
import "./Profile.css"; 
import Button from '../../component/Button';

const Profile = () => {

    const navigate = useNavigate();  //페이지 이동(계정 관리)

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-user-info">
                    <img src="/default-profile.png" alt="이미지" className="profile-img" />
                    <div className="user-details">
                        <div className="user-name">김코너</div>
                        <Button className="setting-account" onClick={() => navigate("/account")} type="set-account-btn" text="⚙️계정 관리" />
                    </div>
                </div>

                <div className="follow-info">
                    <div className="following-num">팔로잉 5</div>
                    <div className="follower-num">팔로워 3</div>
                </div>
            </div>
            <div className="introduce-myself">
                자기소개 | 안녕하세요! 김코너의 블로그입니다~</div>
        </div>
    );
};

export default Profile;
