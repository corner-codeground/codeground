import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../component/Button";
import "./Login_Signup.css";

const BASE_URL = process.env.REACT_APP_API_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const tryLogin = async () => {
    if (!email || !password) {
      setErrorMessage("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      console.log("로그인 성공:", user);
      navigate("/"); // 로그인 성공 시 홈으로 이동
    } catch (error) {
      if (error.response) {
        // 서버가 응답했지만 400~500 오류 코드일 때
        setErrorMessage(error.response.data.message || "로그인에 실패했습니다.");
      } else {
        // 네트워크 오류 또는 서버 다운
        setErrorMessage("네트워크 오류가 발생했습니다.");
      }
    }
  };

  const signUp = () => {
    navigate("/sign_up");
  };

  const inputStyle = (value) => ({
    backgroundColor: value ? "#F5EDED" : "#F0F0F0",
  });

  return (
    <div className="login-container">
      <span>Code Ground</span>
      <div className="input">
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" style={inputStyle(email)} />
      </div>
      <div className="input">
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" style={inputStyle(password)} />
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <Button text="로그인" type="login-btn" onClick={tryLogin} />
      <Button text="회원가입" type="move-signup-btn" onClick={signUp} />
    </div>
  );
};

export default Login;
