import React from 'react';
import './Mypage_BoardTab.css';

const Otherpage_BoardTab = ({ userId, onBoardChange, selectedBoardId }) => {
    const handleClick = (id) => {
        console.log('Clicked Board ID:', id); // 클릭된 ID 로그 확인
        onBoardChange(id);  // selectedBoardId를 변경하는 함수
    };

    return (
        <div className="myboardTab-bar">
            <ul>
                {/* 전체 탭 */}
                <li>
                    <button
                        className={selectedBoardId === 10 ? 'active-link' : ''}
                        onClick={() => handleClick(10)}
                        style={{
                            backgroundColor: "transparent",  // "none" 대신 "transparent"
                            fontWeight: selectedBoardId === 10 ? "bold" : "normal", // font-weight -> fontWeight
                            border: "none",
                            cursor: "pointer",
                            color: "#6482AD",
                            fontSize: "16px",
                        }}
                    >
                        전체
                    </button>
                </li>
                {/* 카테고리 탭 */}
                <li>
                    <button
                        className={selectedBoardId === 20 ? 'active-link' : ''}
                        onClick={() =>  handleClick(20)}
                        style={{
                            backgroundColor: "transparent",  // "none" 대신 "transparent"
                            fontWeight: selectedBoardId === 20 ? "bold" : "normal", // font-weight -> fontWeight
                            border: "none",
                            cursor: "pointer",
                            color: "#6482AD",
                            fontSize: "16px",
                        }}
                    >
                        카테고리
                    </button>
                </li>
            </ul>
            <hr className="mypage-tab-separator" />
        </div>
    );
};

export default Otherpage_BoardTab;
