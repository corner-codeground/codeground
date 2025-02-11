import React, {useState, useEffect} from 'react';
import './DateDisplay.css';

const DateDisplay = () => {
    const [date, setDate] = useState('');

    useEffect(() => {
        const currentDate = new Date().toLocaleDateString();
        setDate(currentDate);
    }, []);

    return <div className="date">{date}</div>;
};

export default DateDisplay;
