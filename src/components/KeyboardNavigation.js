import { useEffect } from 'react';

const KeyboardNavigation = () => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Alt + 1: Go to main content
      if (e.altKey && e.key === '1') {
        e.preventDefault();
        const main = document.querySelector('[role="main"]') || document.querySelector('main');
        if (main) main.focus();
      }
      
      // Alt + 2: Go to navigation
      if (e.altKey && e.key === '2') {
        e.preventDefault();
        const nav = document.querySelector('[role="navigation"]') || document.querySelector('nav');
        if (nav) nav.focus();
      }
      
      // Alt + A: Toggle accessibility toolbar
      if (e.altKey && e.key === 'a') {
        e.preventDefault();
        const toolbar = document.querySelector('.accessibility-toolbar');
        if (toolbar) {
          const firstButton = toolbar.querySelector('button');
          if (firstButton) firstButton.focus();
        }
      }
      
      // Escape: Close modals or go back
      if (e.key === 'Escape') {
        const backBtn = document.querySelector('.back-btn');
        if (backBtn) backBtn.click();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return null;
};

export default KeyboardNavigation;