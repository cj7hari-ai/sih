import React, { useState, useEffect } from 'react';
import { useAccessibility } from './AccessibilityProvider';

const VoiceNavigation = () => {
  const [isListening, setIsListening] = useState(false);
  const { announceToScreenReader } = useAccessibility();

  const speak = (text) => {
    announceToScreenReader(text);
    if ('speechSynthesis' in window) {
      speechSynthesis.speak(new SpeechSynthesisUtterance(text));
    }
  };

  const findButton = (text) => {
    const buttons = document.querySelectorAll('button');
    return Array.from(buttons).find(btn => btn.textContent.includes(text));
  };

  const handleCommand = (command) => {
    try {
    // Navigation
    if (command.includes('student') || command.includes('stud')) {
      const btn = findButton('Student') || document.querySelector('button[aria-describedby="student-desc"]');
      if (btn) { btn.click(); speak('Student login opened'); }
    }
    else if (command.includes('faculty') || command.includes('teacher')) {
      const btn = findButton('Faculty') || document.querySelector('button[aria-describedby="faculty-desc"]');
      if (btn) { 
        btn.click(); 
        speak('Faculty login opened');
        setTimeout(() => {
          const continueBtn = findButton('Continue');
          if (continueBtn) { continueBtn.click(); speak('Faculty dashboard accessed'); }
        }, 1200);
      }
    }
    else if (command.includes('organization') || command.includes('org')) {
      const btn = findButton('Organization') || document.querySelector('button[aria-describedby="org-desc"]');
      if (btn) { 
        btn.click(); 
        speak('Organization login opened');
        setTimeout(() => {
          const continueBtn = findButton('Continue');
          if (continueBtn) { continueBtn.click(); speak('Organization dashboard accessed'); }
        }, 1200);
      }
    }
    else if (command.includes('portfolio') || command.includes('view')) {
      const btn = findButton('Portfolio') || document.querySelector('button[aria-describedby="portfolio-desc"]');
      if (btn) { btn.click(); speak('Portfolio view opened'); }
    }
    else if (command.includes('home') || command.includes('main')) {
      window.location.href = '/';
      speak('Going to home page');
    }
    else if (command.includes('reload') || command.includes('refresh') || command.includes('restart')) {
      speak('Reloading application');
      window.location.href = '/';
      setTimeout(() => {
        window.location.reload(true);
      }, 500);
    }
    
    // Input
    else if (command.includes('college')) {
      const text = command.replace('college', '').trim();
      if (window.voiceInputHandlers?.setCollege && text) {
        window.voiceInputHandlers.setCollege(text);
        speak(`College ${text}`);
      }
    }
    else if (command.includes('id')) {
      const text = command.replace('id', '').trim();
      if (window.voiceInputHandlers?.setStudentId && text) {
        window.voiceInputHandlers.setStudentId(text);
        speak(`ID ${text}`);
      }
    }
    
    // Actions
    else if (command.includes('login') || command.includes('submit') || command.includes('enter')) {
      if (window.voiceInputHandlers?.login) {
        window.voiceInputHandlers.login();
        speak('Logging in');
      } else {
        const btn = findButton('Login') || findButton('Continue') || document.querySelector('button[type="submit"]');
        if (btn) { btn.click(); speak('Submitting'); }
      }
    }
    else if (command.includes('back') || command.includes('return') || command.includes('previous')) {
      const btn = findButton('Back') || document.querySelector('.back-btn') || findButton('⬅');
      if (btn) { btn.click(); speak('Going back'); }
      else { window.history.back(); speak('Going back'); }
    }
    else if (command.includes('approve')) {
      const btn = findButton('Approve');
      if (btn) { btn.click(); speak('Approved'); }
    }
    else if (command.includes('verify')) {
      if (window.studentDashboardHandlers?.verify) {
        window.studentDashboardHandlers.verify();
        speak('Activity verified');
      } else {
        const btn = findButton('Verify');
        if (btn) { btn.click(); speak('Activity verified'); }
      }
    }
    else if (command.includes('stop')) {
      setIsListening(false);
      speak('Voice stopped');
    }
    else if (command.includes('help') || command.includes('commands')) {
      speak('Voice commands: student, faculty, organization, portfolio, college name, id number, login, back, home, reload, verify, approve, stop, help');
    }
    else if (command.includes('repeat') || command.includes('again')) {
      speak('Please repeat your command');
    }
    } catch (e) {
      console.log('Command error:', e);
    }
  };

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) return;
    
    let recognition;
    let isActive = true;

    const startRecognition = () => {
      if (!isActive) return;
      
      try {
        recognition = new window.webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        recognition.maxAlternatives = 5;
        
        // Maximum sensitivity settings
        if (recognition.webkitAudioContext) {
          recognition.webkitAudioContext.createGain().gain.value = 3.0;
        }

        recognition.onresult = (event) => {
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            
            // Check all alternatives for maximum sensitivity
            for (let j = 0; j < Math.min(result.length, 3); j++) {
              const transcript = result[j].transcript.toLowerCase().trim();
              console.log('Voice detected:', transcript);
            
            if (!isListening) {
              // Maximum sensitivity wake word detection
              const wakeWords = ['navi', 'navy', 'nav', 'avi', 'heavy', 'maybe', 'ave', 'gravy', 'baby'];
              const isWakeWord = wakeWords.some(word => 
                transcript.includes(word) || 
                word.includes(transcript) ||
                transcript.replace(/[^a-z]/g, '').includes(word.substring(0, 2)) ||
                (transcript.length > 1 && word.includes(transcript.substring(0, 2)))
              );
              
              if (isWakeWord || transcript.length > 1) {
                setIsListening(true);
                speak('Voice activated');
                return;
              }
              } else if (transcript.length > 0) {
                handleCommand(transcript);
                return;
              }
            }
          }
        };

        recognition.onerror = () => {
          if (isActive) setTimeout(startRecognition, 1000);
        };
        
        recognition.onend = () => {
          if (isActive) setTimeout(startRecognition, 100);
        };
        
        recognition.start();
      } catch (e) {
        console.log('Speech recognition error:', e);
      }
    };

    startRecognition();
    
    return () => {
      isActive = false;
      if (recognition) recognition.stop();
    };
  }, [isListening]);

  return (
    <>
      <button
        onClick={() => setIsListening(!isListening)}
        className={`voice-nav-btn ${isListening ? 'listening' : 'waiting'}`}
        title={isListening ? 'Voice Active' : 'Say Navi to activate'}
      >
        🎤 {isListening ? 'Active' : 'Voice'}
      </button>
      <div className="voice-status">
        {isListening ? '🎤 ACTIVE - Say your command' : '👂 Say "Navi" (ultra-sensitive)'}
      </div>
      <div className="voice-help">
        Commands: student, faculty, org, portfolio, back, verify, reload, help
      </div>
    </>
  );
};

export default VoiceNavigation;