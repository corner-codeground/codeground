import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import React, {useState} from 'react';

import Header from './component/Header';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Sign_up from "./pages/Sign_up";
import Mypage from "./pages/Mypage";
import Writting from "./pages/Writting";

//완성되기 전 임시로 링크 설정해둠
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); //로그인 상태 관리
  return( 
  <div className="App">
    <Header isLoggedIn={isLoggedIn} />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/sign_up" element={<Sign_up />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/writting" element={<Writting />} />
    </Routes>
    <div>
      <Link to={"/"}>Home  </Link>
      <Link to={"/login"}>Login  </Link>
      <Link to={"/sign_up"}>Sign_up  </Link>
      <Link to={"/mypage"}>Mypage  </Link>
      <Link to={"/writting"}>Writting  </Link>
    </div> 
  </div>
  );
}

export default App;
