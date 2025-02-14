import React from 'react';
import Button from '../../../component/Button';
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