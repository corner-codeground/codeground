import "./Mypage.css";
import profileImage from '../profile.jpg'; // 이미지 경로(임시)
import Mypage_BoardTab from '../component/Mypage_BoardTab';
import Board_Mypages from './board_pages/Board_Mypages';
import { useParams } from 'react-router-dom';


const Mypage= () => {
    const { boardId } = useParams();  // 🔹 URL에서 boardId 가져오기
    const currentBoardId = boardId || "10";  // 🔹 URL에 값이 없으면 기본값 10

    return (
        <div className="mypage-container">
            <div className="page-title">
                마이페이지
                <div className="goto-logout">
                로그아웃
                </div>
            </div>
            <hr className="mypage-separator"/>
            <div className="profile-container">
                <img src={profileImage} alt="프로필 사진" className="profile-img" /> 
                <div className="personal-info"> 개인정보(이름, 이메일 등) </div>
            </div>
            <div className="my-posts">
                <Mypage_BoardTab />
                <Board_Mypages boardId={currentBoardId} />

            </div>
        </div>            
    );
};

export default Mypage;