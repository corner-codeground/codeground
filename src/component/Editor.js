import React, { useEffect, useRef, useState } from 'react';
import './Editor.css';
import EditorToolbar from '../component/EditorToolbar';  // EditorToolbar 임포트

const Editor = ({ content, setContent }) => {
    const editorRef = useRef(null);
    const [isInCodeBlock, setIsInCodeBlock] = useState(false);  // 코드 블록 여부 상태 추가

    useEffect(() => {
        const editor = editorRef.current;
        const placeholder = "글을 입력해주세요";

        if (editor) {
            if (content === '') {
                editor.setAttribute('data-placeholder', placeholder);
            } else {
                editor.removeAttribute('data-placeholder');
            }
        }
    }, [content]);

    // 코드 블록 삽입 함수
    const insertCodeBlock = () => {
        const editor = editorRef.current;
        if (editor) {
            const codeBlock = document.createElement('pre');
            const codeContent = document.createElement('code');
            codeContent.textContent = '코드 입력';  // 기본 텍스트 설정
            codeContent.style.color = 'white';  // 임시로 하얀색 글자로 입력되도록 함
            codeBlock.appendChild(codeContent);
            editor.appendChild(codeBlock);  // 에디터에 코드 블록 추가

            // 첫 번째 줄 삽입
            const newLine = document.createElement('br');
            codeContent.appendChild(newLine);  // 코드 블록 내에 줄 바꿈 추가
            setContent(editor.innerHTML);  // 에디터 내용 업데이트

            // 코드 블록 내에서 줄 바꿈을 허용하도록 설정
            setIsInCodeBlock(true);  // 코드 블록 상태 변경
        }
    };

    // 스타일을 적용하는 함수
    const handleApplyStyle = (styleType) => {
        const editor = editorRef.current;
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);  // 현재 선택된 범위

        if (!range) return;  // 선택된 텍스트가 없으면 종료

        const span = document.createElement('span');
        span.classList.add('editor-style');  // 고유 클래스 추가

        switch (styleType) {
            case 'bold':
                span.style.fontWeight = 'bold';
                break;
            case 'italic':
                span.style.fontStyle = 'italic';
                break;
            case 'underline':
                span.style.textDecoration = 'underline';
                break;
            case 'strikethrough':
                span.style.textDecoration = 'line-through';
                break;
            case 'highlighter':
                span.style.backgroundColor = 'yellow';
                break;
            case 'code':
                span.style.fontFamily = 'monospace';
                break;
            default:
                break;
        }

        range.surroundContents(span);  // 선택된 텍스트를 span으로 감싸기
        setContent(editor.innerHTML);  // 에디터 내용 업데이트
    };

    // 엔터 키로 코드 블록 내에서 줄 바꿈이 가능하도록 처리
    const handleKeyDown = (e) => {
        const editor = editorRef.current;
        if (!editor) return;

        if (e.key === 'Enter') {
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const node = range.startContainer;

            // 코드 블록 내에서만 엔터 키 동작
            if (node && node.nodeName === 'CODE') {
                // 코드 블록 내에서 줄 바꿈을 추가
                e.preventDefault();  // 기본 엔터 동작 취소
                const newLine = document.createElement('br');
                range.insertNode(newLine);  // 코드 블록 내에 줄 바꿈 삽입
                range.setStartAfter(newLine);  // 커서를 새 줄로 이동

                // 에디터 내용 업데이트
                setContent(editorRef.current.innerHTML);
            }
        }
    };

    // 에디터 밖을 클릭했을 때 코드 블록 외부로 커서를 이동
    const handleClickOutside = (e) => {
        const editor = editorRef.current;
        if (editor && !editor.contains(e.target)) {
            setIsInCodeBlock(false);  // 코드 블록 외부 클릭 시, 코드 블록 내 입력 종료
        }
    };

    useEffect(() => {
        // 코드 블록 외부 클릭 시 이벤트 리스너 추가
        document.addEventListener('click', handleClickOutside);

        return () => {
            // 컴포넌트 언마운트 시 이벤트 리스너 제거
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="content-input">
            {/* EditorToolbar에서 스타일 적용 기능 제공 */}
            <EditorToolbar applyStyle={handleApplyStyle} insertCodeBlock={insertCodeBlock}/>
            <div
                ref={editorRef}
                className="editable-content"
                contentEditable={true}
                onInput={(e) => setContent(e.target.innerHTML)}
                onKeyDown={handleKeyDown}  // 엔터 키 이벤트 처리
            />
        </div>
    );
};

export default Editor;
