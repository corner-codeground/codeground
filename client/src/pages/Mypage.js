import "./Mypage.css";
import Profile from "./userInfo_follow/Profile";
import Mypage_BoardTab from "../component/Mypage_BoardTab";
import Board_Mypages from "./board_pages/Board_Mypages";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Mypage = () => {
  const { boardId } = useParams();
  const currentBoardId = boardId || "10";
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  // 프로필 조회
  const fetchProfile = async () => {
    try {
      const response = await axios.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setProfile(response.data);
    } catch (error) {
      console.error("프로필 정보를 불러오는 중 오류 발생:", error);
    }
  };

  // 팔로잉 목록 조회
  const fetchFollowing = async () => {
    try {
      const response = await axios.get("/auth/profile/following", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setFollowing(response.data.following);
    } catch (error) {
      console.error("팔로잉 목록을 불러오는 중 오류 발생:", error);
    }
  };

  // 팔로워 목록 조회
  const fetchFollowers = async () => {
    try {
      const response = await axios.get("/auth/profile/follower", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setFollowers(response.data.followers);
    } catch (error) {
      console.error("팔로워 목록을 불러오는 중 오류 발생:", error);
    }
  };

  // 로그아웃 함수
  const handleLogout = async () => {
    try {
      await axios.post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      localStorage.removeItem("access_token");
      navigate("/login");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchFollowing();
    fetchFollowers();
  }, []);

  return (
    <div className="mypage-container">
      <div className="page-title">
        마이페이지
        <div className="goto-logout" onClick={handleLogout}>
          로그아웃
        </div>
      </div>
      <hr className="mypage-separator" />
      <div className="profile-container">{profile ? <Profile profileData={profile} /> : <p>프로필을 불러오는 중...</p>}</div>
      <div className="follow-info">
        <p>팔로워: {followers.length}</p>
        <p>팔로잉: {following.length}</p>
      </div>
      <div className="my-posts">
        <Mypage_BoardTab />
        <Board_Mypages boardId={currentBoardId} />
      </div>
    </div>
  );
};

export default Mypage;
