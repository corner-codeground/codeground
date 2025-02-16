import { Routes, Route, Link } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import React, {useState} from 'react';

import Header from './component/Header';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Sign_up from "./pages/Sign_up";
import Mypage from "./pages/Mypage";
import Writting from "./pages/Writting";

import BoardPages from './pages/board_pages/BoardPages';   // boards 폴더로 변경
import Board_Mypages from './pages/board_pages/Board_Mypages';  
import PostDetail from './pages/board_pages/PostDetail';
import PostEditPage from './pages/board_pages/PostEditPage';

// 계정 관리 페이지 
import Set_userInfo from './pages/userInfo_follow/Set_userInfo'; // 경로 추가
import Account from './pages/userInfo_follow/Account';

import ProfilePage from './pages/ProfilePage';  // 프로필 페이지 임포트
//import BoardPages_category from './pages/board_pages/BoardPages_category';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); //로그인 상태 관리

  return( 
  <div className="App">
    <Header isLoggedIn={isLoggedIn} />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/sign_up" element={<Sign_up />} />
      <Route path="/mypage/:boardId?" element={<Mypage />} />
      <Route path="/writting" element={<Writting />} />
      {/* 게시판 별 페이지 */}
      <Route path="/boards/:boardId" element={<BoardPages />} /> {/* 게시판 ID에 따라 다르게 */}
      <Route path="/boards/:boardId/:postId" element={<PostDetail />} /> {/* 포스트 상세 페이지 */}
      <Route path="/post-edit/:postId" element={<PostEditPage />} />
      <Route path="/mypages/:boardId" element={<Board_Mypages />} />

      {/* 계정 관리 페이지 추가 */}
      <Route path="/profile-edit" element={<Set_userInfo />} /> 
      <Route path="/account" element={<Account />} /> 
      
      {/* 친구 프로필 페이지 추가 */}
      <Route path="/profile/:userId" element={<ProfilePage />} /> {/* 동적 프로필 페이지 */}
    </Routes>
    <div>
      
      <Link to={"/login"}>Login  </Link>
      <Link to={"/sign_up"}>Sign_up  </Link>
      
    </div> 
  </div>
  );
}

export default App;
