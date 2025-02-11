import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "../component/Button";
import "./Login_Signup.css";

const Sign_up= () => {
    const [nickname, setNickname] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    //const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    
    const trySignup = () => {    //회원가입
        if (!nickname || !id || !password || !confirmPass) //입력하지 않은 것이 있는 상황
            setErrorMessage("모든 항목을 입력해주세요.")
        else if(password !== confirmPass){  //비밀번호 일치하지 않음 
            setErrorMessage("비밀번호가 일치하지 않습니다.")
        }
        else{ //이상이 없는 경우 
            console.log("회원가입:", id, password);
            setErrorMessage("");
            navigate("/login");
        }
    };
    const inputStyle = (value) => {  //인풋 시 색 변화
        return value ? { backgroundColor: "#F5EDED" } : { backgroundColor: "#F0F0F0" };
    }

    return (
        <div className="signup-container">
            <span>Code Ground</span>
            <div className="input">
                <span>닉네임</span>
                <input
                    type= "text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="닉네임을 입력하세요"
                    style={inputStyle(nickname)}
                />
            </div>
            <div className="input">
                <span>아이디</span>
                <input
                    type= "text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="아이디를 입력하세요"
                    style={inputStyle(id)}
                />
            </div>
            <div className="input">
                <span>비밀번호</span>
                <input
                    type= "text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호를 입력하세요"
                    style={inputStyle(password)}
                />
            </div>
            <div className="input">
                <span>비밀번호 재입력</span>
                <input
                    type= "text"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    placeholder="비밀번호를 한 번 더 입력하세요"
                    style={inputStyle(confirmPass)}
                />
            </div>
            
            {errorMessage && <p className="error-message">{errorMessage}</p>}
    
            <Button 
                text="회원가입"
                type="signup-btn"
                onClick={trySignup}
            />
        </div>
    );
};

export default Sign_up;