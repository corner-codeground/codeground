import React from 'react';
import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaHighlighter, FaCode } from 'react-icons/fa'; // FontAwesome 아이콘 임포트 (npm install react-icons)
import './EditorToolbar.css';

const EditorToolbar = ({applyStyle}) => {
    return (
        <div className="editor-toolbar">
            <button onClick={() => applyStyle('bold')} title="Bold">
                <FaBold />
            </button>
            <button onClick={() => applyStyle('italic')} title="Italic">
                <FaItalic />
            </button>
            <button onClick={() => applyStyle('underline')} title="Underline">
                <FaUnderline />
            </button>
            <button onClick={() => applyStyle('strikethrough')} title="Strikethrough">
                <FaStrikethrough />
            </button>
            <button onClick={() => applyStyle('highlighter')} title="Highlighter">
                <FaHighlighter />
            </button>
            <button onClick={() => applyStyle('code')} title="Code">
                <FaCode />
            </button>
        </div>
    );
};


export default EditorToolbar;