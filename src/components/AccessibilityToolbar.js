import React from 'react';
import { useAccessibility } from './AccessibilityProvider';
import './AccessibilityToolbar.css';

const AccessibilityToolbar = () => {
  const { 
    highContrast, 
    setHighContrast, 
    fontSize, 
    setFontSize,
    announceToScreenReader 
  } = useAccessibility();

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    announceToScreenReader(`High contrast ${!highContrast ? 'enabled' : 'disabled'}`);
  };

  const changeFontSize = (size) => {
    setFontSize(size);
    announceToScreenReader(`Font size changed to ${size}`);
  };

  return (
    <div className="accessibility-toolbar" role="toolbar" aria-label="Accessibility options">
      <button
        onClick={toggleHighContrast}
        aria-pressed={highContrast}
        aria-label={`${highContrast ? 'Disable' : 'Enable'} high contrast mode`}
        className="accessibility-btn"
      >
        🎨 High Contrast
      </button>
      
      <div className="font-size-controls" role="group" aria-label="Font size controls">
        <button
          onClick={() => changeFontSize('small')}
          aria-pressed={fontSize === 'small'}
          aria-label="Small font size"
          className="accessibility-btn"
        >
          A-
        </button>
        <button
          onClick={() => changeFontSize('normal')}
          aria-pressed={fontSize === 'normal'}
          aria-label="Normal font size"
          className="accessibility-btn"
        >
          A
        </button>
        <button
          onClick={() => changeFontSize('large')}
          aria-pressed={fontSize === 'large'}
          aria-label="Large font size"
          className="accessibility-btn"
        >
          A+
        </button>
      </div>
    </div>
  );
};

export default AccessibilityToolbar;