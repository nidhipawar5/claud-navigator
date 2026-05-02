import React, { useState } from 'react';
import './index.css';
import ChatInput from './ChatInput';
import NavigatorPanel from './NavigatorPanel';
import { analyzeIntent } from './intentLogic';

function App() {
  const [navigatorEnabled, setNavigatorEnabled] = useState(true);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am Claude. How can I help you today?' }
  ]);
  const [interceptState, setInterceptState] = useState(null); // null | { prompt: string, status: 'analyzing' | 'ready', result: object }
  
  const suggestions = [
    { text: "Search the web for the latest AI news", type: "Skill" },
    { text: "Create a 10-slide pitch deck for my SaaS", type: "Workflow" },
    { text: "Help me build a python web scraper", type: "Agent" }
  ];

  const handlePromptSubmit = (prompt) => {
    // Add user message immediately
    setMessages(prev => [...prev, { role: 'user', content: prompt }]);
    
    if (navigatorEnabled) {
      setInterceptState({ prompt, status: 'analyzing' });
      
      // Simulate intent analysis delay
      setTimeout(() => {
        const result = analyzeIntent(prompt);
        if (result.recommendation.id === 'prompt') {
          // Direct Prompt: Bypass Navigator Panel entirely
          setInterceptState(null);
          executePromptResponse(prompt, 'Direct Prompt');
        } else {
          // Show Navigator Panel for Agent, Workflow, or Skill
          setInterceptState({ prompt, status: 'ready', result });
        }
      }, 600);
    } else {
      executePromptResponse(prompt, 'Direct Prompt');
    }
  };

  const executePromptResponse = (prompt, method) => {
    setInterceptState(null);
    setMessages(prev => [
      ...prev,
      { role: 'assistant', content: `[Executed via ${method}] Here is the simulated response to your request.` }
    ]);
  };

  const cancelIntercept = () => {
    setInterceptState(null);
    setMessages(prev => [
      ...prev,
      { role: 'assistant', content: 'Action canceled. How else can I help you?' }
    ]);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="model-selector">
          Claude 3.5 Sonnet
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>
        <div className="navigator-toggle">
          <div className={`status-indicator ${navigatorEnabled ? 'active' : ''}`}></div>
          <span style={{ fontWeight: 500 }}>Claude Navigator</span>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={navigatorEnabled} 
              onChange={(e) => setNavigatorEnabled(e.target.checked)} 
            />
            <span className="slider"></span>
          </label>
        </div>
      </header>

      <div className="chat-container">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            <div className="message-content">
              {msg.content}
            </div>
          </div>
        ))}
        
        {/* Render Suggestions always at the bottom of the chat */}
        <div className="suggestions-grid">
          {suggestions.map((sug, i) => (
            <div 
              key={i} 
              className="suggestion-card"
              onClick={() => handlePromptSubmit(sug.text)}
            >
              <div className="suggestion-text">{sug.text}</div>
              <div className="suggestion-type">Triggers: {sug.type}</div>
            </div>
          ))}
        </div>

        {/* Inline analyzing indicator */}
        {interceptState?.status === 'analyzing' && (
          <div className="message assistant">
            <div className="message-content analyzing-indicator">
              <div className="spinner"></div>
              <span>Claude is routing your request...</span>
            </div>
          </div>
        )}
      </div>

      {interceptState?.status === 'ready' && (
        <NavigatorPanel 
          result={interceptState.result}
          onExecute={(methodId, methodTitle) => executePromptResponse(interceptState.prompt, methodTitle)}
          onCancel={cancelIntercept}
        />
      )}

      <ChatInput 
        onSubmit={handlePromptSubmit} 
        disabled={interceptState !== null}
      />
    </div>
  );
}

export default App;
