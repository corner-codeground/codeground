import "./Button.css";
import React from 'react';

const Button = ({text, type, onClick}) => {
    const btnType= type || "default";
    return (
        <button 
            className={`Button Button_${btnType}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};
Button.defaultProps={
    type: "default",
};
export default Button;