import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Profile from './userInfo_follow/Profile';
import Otherpage_BoardTab from '../component/Otherpage_BoardTab';
import Board_Mypages from './board_pages/Board_Mypages';

const ProfilePage = () => {
    const { userId } = useParams();  
    const [profile, setProfile] = useState(null);
    const [selectedBoardId, setSelectedBoardId] = useState(10);   // 선택된 게시판 ID 상태 추가

    useEffect(() => {
        const profileData = { //임시 데이터 
            1: { name: '홍길동', bio: '홍길동의 소개', following: 13, follower: 10 },
            2: { name: '이순신', bio: '이순신의 소개', following: 13, follower: 10 },
            3: { name: '김유신', bio: '김유신의 소개', following: 13, follower: 10  },
            4: { name: '박지성', bio: '박지성의 소개', following: 13, follower: 10  },
            5: { name: '차은우', bio: '차은우의 소개', following: 13, follower: 10  },
        };

        setProfile(profileData[userId]);  
    }, [userId]);
    

    if (!profile) return <div>친구 정보를 불러오는 중...</div>;

    return (
        <div className="mypage-container">
            <div className="profile-container">
                <Profile 
                    name={profile.name} 
                    bio={profile.bio} 
                    isOwnProfile={false} 
                    following={profile.following} 
                    follower={profile.follower} />
            </div>
            <div className="my-posts">
                {/* Board ID를 변경하는 함수 전달 */}
                <Otherpage_BoardTab 
                    userId={userId} 
                    onBoardChange={setSelectedBoardId} 
                    selectedBoardId={selectedBoardId} 
                />
                <Board_Mypages boardId={selectedBoardId} />
            </div>
        </div>
    );
};

export default ProfilePage;
