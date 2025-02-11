import React from 'react';

const EditorToolbar = () => {
    return (
        <div className="editor-toolbar">
            <button onClick={() => applyStyle('bold')}>굵게</button>
            <button onClick={() => applyStyle('italic')}>기울임</button>
            <button onClick={() => applyStyle('underline')}>밑줄</button>
            <button onClick={() => applyStyle('fontSize')}>폰트 크기</button>
        </div>
    );
};

const applyStyle = (styleType) => {
    const editor = document.querySelector('.editable-content');
    if (editor) {
        document.execCommand(styleType, false, null);
    }
};

export default EditorToolbar;