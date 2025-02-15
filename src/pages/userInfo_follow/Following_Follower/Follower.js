//팔로워 목록 컴포넌트
import React from 'react';
import Profile_Others from './Profile_Others';
import './Follower.css';

const Follower = () => {
    return (
        <div className="following-users">
            팔로워 목록
            <div className="following-users-set">
            <Profile_Others isFollower={true} />
        </div>
        </div>
    
    );
};

export default Follower;
