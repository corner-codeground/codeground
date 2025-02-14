import React, { useState } from 'react';
import './Notification.css';

const Notification = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            profileImg: "https://via.placeholder.com/40", // 프로필 이미지 URL (예제)
            nickname: "김개발",
            date: "2025-02-14",
            message: "새로운 댓글이 달렸습니다.",
            isRead: false
        },
        {
            id: 2,
            profileImg: "https://via.placeholder.com/40",
            nickname: "이프론트",
            date: "2025-02-13",
            message: "게시물이 좋아요를 받았습니다.",
            isRead: true
        },
        {
            id: 3,
            profileImg: "https://via.placeholder.com/40",
            nickname: "박백엔드",
            date: "2025-02-12",
            message: "새로운 메시지가 도착했습니다.",
            isRead: false
        }
    ]);

    return (
        <div className="notification-content">
            <ul>
                {notifications.map((notification) => (
                    <li key={notification.id} className={notification.isRead ? "read" : "unread"}>
                        <img src={notification.profileImg} alt="프로필" className="profile-img-notification" />
                        <div className="notification-text">
                            <span className="nickname">{notification.nickname}님이 댓글을 남겼습니다.</span>
                            <div className="message-container">
                                <p>{notification.message}</p>
                                <span className="date">{notification.date}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notification;
