import React, { useEffect, useRef } from 'react';

const Editor = ({ content, setContent }) => {
    const editorRef = useRef(null);

    useEffect(() => {
        const editor = editorRef.current;
        const placeholder = "글을 입력해주세요";

        // editorRef가 null인지 확인 (null이면 placeholder 보이도록)
        if (editor) {
            if (content === '') {
                editor.setAttribute('data-placeholder', placeholder);
            } else {
                editor.removeAttribute('data-placeholder');
            }
        }
    }, [content]);

    return (
        <div className="content-input">      
            <div
                ref={editorRef}
                className="editable-content" 
                contentEditable={true}
                onInput={(e) => setContent(e.target.innerHTML)}
            />
        </div>
    );
};

export default Editor;