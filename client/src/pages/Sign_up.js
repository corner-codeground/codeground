import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../component/Button";
import "./Login_Signup.css";

const Sign_up = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const trySignup = async () => {
    if (!nickname || !email || !password || !confirmPass) {
      setErrorMessage("모든 항목을 입력해주세요.");
      return;
    }
    if (password !== confirmPass) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const BASE_URL = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${BASE_URL}/auth/join`, {
        username: nickname,
        email: email,
        password: password,
        confirmPassword: confirmPass,
      });

      if (response.data.message === "회원가입 성공") {
        alert("회원가입이 완료되었습니다.");
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || "회원가입에 실패했습니다.");
      } else {
        setErrorMessage("서버와의 연결이 원활하지 않습니다.");
      }
    }
  };

  const inputStyle = (value) => ({
    backgroundColor: value ? "#F5EDED" : "#F0F0F0",
  });

  return (
    <div className="signup-container">
      <span>Code Ground</span>
      <div className="input">
        <span>닉네임</span>
        <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="닉네임을 입력하세요" style={inputStyle(nickname)} />
      </div>
      <div className="input">
        <span>이메일</span>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일을 입력하세요" style={inputStyle(email)} />
      </div>
      <div className="input">
        <span>비밀번호</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
          style={inputStyle(password)}
        />
      </div>
      <div className="input">
        <span>비밀번호 재입력</span>
        <input
          type="password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          placeholder="비밀번호를 한 번 더 입력하세요"
          style={inputStyle(confirmPass)}
        />
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <Button text="회원가입" type="signup-btn" onClick={trySignup} />
    </div>
  );
};

export default Sign_up;
