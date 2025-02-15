//다른 사람 프로필 컴포넌트
import React from 'react';
import './Profile_Others.css';
import { Link } from 'react-router-dom';

const Profile_Others = ({ isFollower }) => {
    // 임의로 만든 유저 데이터
    const users = [
        { id: 1, name: '홍길동', profileImage: 'https://via.placeholder.com/85/FF6347/FFFFFF?text=홍' },
        { id: 2, name: '이순신', profileImage: 'https://via.placeholder.com/85/4682B4/FFFFFF?text=이' },
        { id: 3, name: '김유신', profileImage: 'https://via.placeholder.com/85/32CD32/FFFFFF?text=김' },
        { id: 4, name: '박지성', profileImage: 'https://via.placeholder.com/85/DC143C/FFFFFF?text=박' },
        { id: 5, name: '차은우', profileImage: 'https://via.placeholder.com/85/FFD700/FFFFFF?text=차' }
    ];
    
    return (
        <div className="profile-others-container">
            {users.map(user => (
                <div key={user.id} className="profile-others">
                    <img src={user.profileImage} alt={user.name} className="profile-others-img" />
                    <div className="profile-details">
                        <Link to={`/profile/${user.id}`} className="other-name">
                            {user.name}
                        </Link>
                        <button className="setting-follow-btn">
                            {isFollower ? "팔로워 삭제" : "팔로우 취소"}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Profile_Others;
