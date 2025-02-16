//게시판 탭(네비게이션)
import React from "react";
import { NavLink } from "react-router-dom";
import "./BoardTabs.css";

const BoardTabs = () => {
  //링크 나중에 수정
  return (
    <div className="boardTab-bar">
      <ul>
        <li>
          <NavLink to="/boards/1" className={({ isActive }) => (isActive ? "active-link" : "")}>
            프론트엔드
          </NavLink>
        </li>
        <li>
          <NavLink to="/boards/2" className={({ isActive }) => (isActive ? "active-link" : "")}>
            백엔드
          </NavLink>
        </li>
        <li>
          <NavLink to="/boards/3" className={({ isActive }) => (isActive ? "active-link" : "")}>
            보안
          </NavLink>
        </li>
        <li>
          <NavLink to="/boards/4" className={({ isActive }) => (isActive ? "active-link" : "")}>
            미디어
          </NavLink>
        </li>
        <li>
          <NavLink to="/boards/5" className={({ isActive }) => (isActive ? "active-link" : "")}>
            인공지능
          </NavLink>
        </li>
        <li>
          <NavLink to="/boards/6" className={({ isActive }) => (isActive ? "active-link" : "")}>
            임베디드 & IoT
          </NavLink>
        </li>
        <li>
          <NavLink to="/boards/7" className={({ isActive }) => (isActive ? "active-link" : "")}>
            블록체인 & 웹3
          </NavLink>
        </li>
        <li>
          <NavLink to="/boards/8" className={({ isActive }) => (isActive ? "active-link" : "")}>
            빅데이터
          </NavLink>
        </li>
        <li>
          <NavLink to="/boards/9" className={({ isActive }) => (isActive ? "active-link" : "")}>
            코드 그라운드
          </NavLink>
        </li>
      </ul>
      <hr />
    </div>
  );
};
export default BoardTabs;
