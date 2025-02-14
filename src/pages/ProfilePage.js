import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Profile from './userInfo_follow/Profile';  // Profile 컴포넌트
import Otherpage_BoardTab from '../component/Otherpage_BoardTab';  // Mypage_BoardTab 임포트
import Board_Mypages from './board_pages/Board_Mypages';  // Board_Mypages 임포트
import PostPreview from './board_pages/PostPreview';

const ProfilePage = () => {
    const { userId } = useParams();  // URL에서 userId를 받아옵니다.
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const profileData = {
            1: { name: '홍길동', bio: '홍길동의 소개' },
            2: { name: '이순신', bio: '이순신의 소개' },
            3: { name: '김유신', bio: '김유신의 소개' },
            4: { name: '박지성', bio: '박지성의 소개' },
            5: { name: '차은우', bio: '차은우의 소개' },
        };

        setProfile(profileData[userId]);  
    }, [userId]);

    if (!profile) return <div>친구 정보를 불러오는 중...</div>;

    const currentBoardId = 10;

    return (
        <div className="mypage-container">
            <div className="profile-container">
                {/* 자신의 프로필이 아니라면 isOwnProfile을 false로 전달 */}
                <Profile name={profile.name} bio={profile.bio} isOwnProfile={false} />
            </div>
            <div className="my-posts">
                <Otherpage_BoardTab />
                <Board_Mypages boardId={currentBoardId} />
            </div>
        </div>
    );
};

export default ProfilePage;
