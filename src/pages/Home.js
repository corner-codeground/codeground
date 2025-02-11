import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import BoardTabs from '../component/BoardTabs';
import './Home.css';

const Home= () => {
    const navigate = useNavigate();
    
    return (
        <div>
            <BoardTabs />
            <div className="explain">
                전체 인기글
            </div>
        </div>
    );
};

export default Home;