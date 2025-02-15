//팔로잉 목록 컴포넌트
import React from 'react';
import Profile_Others from './Profile_Others';
import './Following.css';

const Following = () => {
    return (
        <div className="following-users">
            팔로잉 목록
            <div className="following-users-set">
                <Profile_Others />
            </div>
        </div>
    );
};
export default Following;