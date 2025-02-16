import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Profile_Others from './Profile_Others';
import './Follower.css';

const BASE_URL = process.env.REACT_APP_API_URL;

const Follower = () => {
    const [followers, setFollowers] = useState([]);

    // 팔로워 목록 가져오기
    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/follow/followers`);
                setFollowers(response.data);
            } catch (error) {
                console.error("팔로워 목록을 불러오는 데 실패했습니다.", error);
            }
        };

        fetchFollowers();
    }, []); // 빈 배열을 의존성으로 설정하여 컴포넌트 마운트 시 한 번만 실행됨


    return (
        <div className="following-users">
            <h2>팔로워 목록</h2>
            <div className="following-users-set">
                {/* 팔로워 목록을 순회하며 Profile_Others 컴포넌트에 데이터 전달 */}
                {followers.length > 0 ? (
                    followers.map(follower => (
                        <Profile_Others 
                            key={follower.id} 
                            isFollower={true} 
                            followerData={follower}  // 팔로워 데이터 전달
                        />
                    ))
                ) : (
                    <p>팔로워가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default Follower;
