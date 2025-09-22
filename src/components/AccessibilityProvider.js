import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export const useAccessibility = () => useContext(AccessibilityContext);

export const AccessibilityProvider = ({ children }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('normal');
  const [screenReader, setScreenReader] = useState(false);

  useEffect(() => {
    // Apply accessibility settings to document
    document.documentElement.setAttribute('data-high-contrast', highContrast);
    document.documentElement.setAttribute('data-font-size', fontSize);
    
    // Announce page changes to screen readers
    if (screenReader) {
      const announcer = document.createElement('div');
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.className = 'sr-only';
      document.body.appendChild(announcer);
    }
  }, [highContrast, fontSize, screenReader]);

  const announceToScreenReader = (message) => {
    const announcer = document.querySelector('[aria-live="polite"]');
    if (announcer) {
      announcer.textContent = message;
      setTimeout(() => announcer.textContent = '', 1000);
    }
  };

  return (
    <AccessibilityContext.Provider value={{
      highContrast,
      setHighContrast,
      fontSize,
      setFontSize,
      screenReader,
      setScreenReader,
      announceToScreenReader
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};