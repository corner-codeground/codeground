//다른 사람 프로필 컴포넌트
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './Profile_Others.css';
const BASE_URL = process.env.REACT_APP_API_URL;

const Profile_Others = ({ isFollower }) => {
    const { id } = useParams(); // URL의 :id 값을 가져옴
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/auth/profile/${id}`);
            setProfile(response.data);
        } catch (err) {
            console.error('프로필 데이터를 가져오는데 실패했습니다:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
        };

        fetchProfile();
    }, [id]);

    if (loading) return <div>로딩중...</div>;
    if (error) return <div>프로필을 불러오는데 실패했습니다.</div>;
    if (!profile) return null;

    // 백엔드 응답 구조 해체
    const { user, followersCount, followingsCount, isOwnProfile } = profile;

    return (
        <div className="profile-others-container">
            <img src={user.profileImage} alt={user.username} className="profile-others-img" />
            <div className="profile-details">
            <h2>{user.username}</h2>
            <p>{user.bio}</p>
            <div className="profile-stats">
                <span>팔로워: {followersCount}</span>
                <span>팔로잉: {followingsCount}</span>
            </div>
            {/* 자신의 프로필이 아니라면 팔로우/팔로워 관련 버튼 표시 */}
            {!isOwnProfile && (
                <button className="setting-follow-btn">
                    {isFollower ? '팔로워 삭제' : '팔로우 취소'}
                </button>
            )}
            {/* 다른 사용자의 상세 프로필 페이지로 이동하는 링크 */}
            <Link to={`/profile/${id}`}>상세 프로필 보기</Link>
            </div>
        </div>
        );
    };

export default Profile_Others;
