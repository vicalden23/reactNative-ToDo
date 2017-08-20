const loadingMessages = {};

loadingMessages.lines = [
  "Refactoring to use Backbone...",
  "When the world finally says hello to you...",
  "I <3 Todo It..."
];

loadingMessages.random = () => {
  const lines = loadingMessages.lines;
  const index = Math.floor(Math.random() * lines.length);
  return lines[index];
};

export default loadingMessages;