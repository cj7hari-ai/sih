import React, { useEffect, useState } from 'react';
import { useAccessibility } from './AccessibilityProvider';

const WakeWordDetection = ({ onWakeWordDetected }) => {
  const [wakeWordRecognition, setWakeWordRecognition] = useState(null);
  const { announceToScreenReader } = useAccessibility();

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
        
        if (transcript.includes('hey navi') || transcript.includes('hey navy')) {
          onWakeWordDetected();
          announceToScreenReader('Voice navigation activated. Say help for commands.');
        }
      };

      recognition.onerror = () => {
        // Restart on error
        setTimeout(() => {
          try {
            recognition.start();
          } catch (e) {}
        }, 1000);
      };

      recognition.onend = () => {
        // Auto restart
        setTimeout(() => {
          try {
            recognition.start();
          } catch (e) {}
        }, 100);
      };

      setWakeWordRecognition(recognition);
      
      // Start listening for wake word
      try {
        recognition.start();
      } catch (e) {}

      return () => {
        recognition.stop();
      };
    }
  }, [onWakeWordDetected, announceToScreenReader]);

  return null;
};

export default WakeWordDetection;