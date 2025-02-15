// 팔로우 관리 탭
import React from 'react';
import './Follow_manager.css';
import Following from './Following_Follower/Following';
import Follower from './Following_Follower/Follower';

const Follow_manager = () => {
    return ( // return 구문 추가
        <div className="follow-management">
            <div className="following-set">
                <Following /></div>
            <div className="follower-set">
                <Follower /></div>
        </div>
    );
};

export default Follow_manager;