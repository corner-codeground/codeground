import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001",
});

// 회원가입 API 함수
export const registerUser = async (nickname, email, password, confirmPassword) => {
  try {
    const response = await API.post("/auth/join", {
      username: nickname,
      email,
      password,
      confirmPassword,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
