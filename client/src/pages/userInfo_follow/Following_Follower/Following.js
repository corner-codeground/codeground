import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Profile_Others from './Profile_Others';
import './Following.css';

const BASE_URL = process.env.REACT_APP_API_URL;

const Following = () => {
    const [following, setFollowing] = useState([]);  // 팔로잉 데이터를 관리할 상태
    const [error, setError] = useState(null);  // 에러 상태

    // 팔로잉 목록 가져오기
    useEffect(() => {
        const fetchFollowing = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/follow/following`);  // API 요청
                setFollowing(response.data);  // 팔로잉 목록 상태 업데이트
            } catch (error) {
                setError("팔로잉 목록을 가져오는 데 실패했습니다.");  // 에러 메시지 설정
                console.error("팔로잉 목록을 가져오는 데 실패했습니다.", error);
            }
        };

        fetchFollowing();
    }, []);

    return (
        <div className="following-users">
            <h2>팔로잉 목록</h2>
            <div className="following-users-set">
                {error && <p className="error-message">{error}</p>} {/* 에러 메시지 표시 */}
                {following.length > 0 ? (
                    following.map(followed => (
                        <Profile_Others 
                            key={followed.id} 
                            isFollower={false}  // 팔로잉 목록이므로 isFollower를 false로 설정
                            followerData={followed}  // 팔로잉 정보를 전달
                        />
                    ))
                ) : (
                    <p>팔로잉이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default Following;
