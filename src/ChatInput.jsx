import React, { useState, useRef, useEffect } from 'react';

const ChatInput = ({ onSubmit, disabled }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !disabled) {
        onSubmit(input.trim());
        setInput('');
      }
    }
  };

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSubmit(input.trim());
      setInput('');
    }
  };

  return (
    <div className="input-area">
      <div className="input-box-container">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="How can Claude help you today?"
          disabled={disabled}
          rows={1}
        />
        <button 
          className="send-button" 
          onClick={handleSend}
          disabled={!input.trim() || disabled}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
