// Voice Commands Reference for Users
export const VOICE_COMMANDS = {
  navigation: [
    "go to login",
    "student login", 
    "faculty login",
    "organization login",
    "view portfolio"
  ],
  actions: [
    "login",
    "submit", 
    "back",
    "verify",
    "approve"
  ],
  accessibility: [
    "high contrast",
    "larger text",
    "smaller text"
  ],
  help: [
    "help",
    "commands"
  ]
};

export const announceCommands = () => {
  return `Available voice commands: 
  Navigation: ${VOICE_COMMANDS.navigation.join(', ')}
  Actions: ${VOICE_COMMANDS.actions.join(', ')}
  Accessibility: ${VOICE_COMMANDS.accessibility.join(', ')}
  Say help anytime for this list`;
};