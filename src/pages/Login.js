import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "../component/Button";
import "./Login_Signup.css";

const Login= () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const tryLogin = () => {    //로그인 시도
        if (!id || !password) //아이디 또는 비밀번호 입력하지 않은 상황
            setErrorMessage("아이디와 비밀번호를 입력해주세요.")
        else{ //아이디와 비밀번호 둘다 입력
            console.log("로그인 시도:", id, password);
            setErrorMessage("");
            //로그인한 내용이 회원 정보와 일치하는 경우 홈 화면으로 이동 
        }
    };
    const sign_up = () => { //회원가입 페이지로 이동
        navigate("/sign_up");
    }
    const inputStyle = (value) => {  //인풋 시 색 변화
        return value ? { backgroundColor: "#F5EDED" } : { backgroundColor: "#F0F0F0" };
    }
    return (
        <div className="login-container">
            <span>Code Ground</span>
            <div className="input">
                <input
                    type= "text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="아이디"
                    style={inputStyle(id)}
                />
            </div>
            <div className="input">
                <input
                    type= "password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                    style={inputStyle(password)}
                />
            </div>
            
            {errorMessage && <p className="error-message">{errorMessage}</p>}
    
            <Button 
                text="로그인"
                type="login-btn"
                onClick={tryLogin}
            />
            <Button 
                text="회원가입"
                type="move-signup-btn"
                onClick={sign_up}
            />
        </div>
    );
};

export default Login;