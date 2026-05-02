import React from 'react';

const NavigatorPanel = ({ result, onExecute, onCancel }) => {
  if (!result) return null;

  const { task, recommendation, options } = result;

  return (
    <div className="navigator-panel-wrapper">
      <div className="navigator-panel">
        <div className="panel-header">
          <div className="panel-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
            </svg>
            Claude Navigator
          </div>
        </div>
        
        <div className="identified-task">
          <strong>Identified Task:</strong> {task}
        </div>
        
        <div className="recommendation-banner">
          <div className="rec-title">
            ✨ Recommended Path: {recommendation.title}
          </div>
          <div className="rec-reason">
            <em>Why?</em> {recommendation.reason}
          </div>
        </div>
        
        <div className="options-table-container">
          <table className="options-table">
            <thead>
              <tr>
                <th>Option</th>
                <th>Method</th>
                <th>Estimated Tokens</th>
                <th>Predicted Quality</th>
                <th>Confidence</th>
              </tr>
            </thead>
            <tbody>
              {options.map((opt, i) => (
                <tr key={i} className={opt.isRec ? 'recommended' : ''}>
                  <td>{opt.isRec ? '🏆 Option ' + String.fromCharCode(65+i) : 'Option ' + String.fromCharCode(65+i)}</td>
                  <td style={{ fontWeight: opt.isRec ? 600 : 400 }}>{opt.title}</td>
                  <td>{opt.tokens}</td>
                  <td>{opt.quality}</td>
                  <td>{opt.confidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="panel-actions">
          <button 
            className="btn btn-primary"
            onClick={() => onExecute(recommendation.id, recommendation.title)}
          >
            Execute {recommendation.title} (Enter)
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => onExecute('prompt', 'Direct Prompt')}
          >
            Continue with Direct Prompt
          </button>
          <button 
            className="btn btn-tertiary"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavigatorPanel;
