const levels = [
  { levelCount: 1, levelNickname: "Rookie Rush", balanceRequired: 0 },
  { levelCount: 2, levelNickname: "Novice Nexus", balanceRequired: 50000 },
  {
    levelCount: 3,
    levelNickname: "Challenger Circuit",
    balanceRequired: 100000,
  },
  {
    levelCount: 4,
    levelNickname: "Expert Expedition",
    balanceRequired: 150000,
  },
  { levelCount: 5, levelNickname: "Master Mayhem", balanceRequired: 200000 },
  { levelCount: 6, levelNickname: "Pro Power-Up", balanceRequired: 250000 },
  { levelCount: 7, levelNickname: "Elite Evasion", balanceRequired: 300000 },
  {
    levelCount: 8,
    levelNickname: "Legendary Labyrinth",
    balanceRequired: 350000,
  },
  {
    levelCount: 9,
    levelNickname: "Champion's Gauntlet",
    balanceRequired: 400000,
  },
  {
    levelCount: 10,
    levelNickname: "Ultimate Showdown",
    balanceRequired: 450000,
  },
];


// Function to determine if level update is needed
const checkLevel = (balance, currentLevel) => {
  // If the user is at level 1 and balance is less than 50,000, no update needed
  if (currentLevel === 1 && balance < 50000) {
    return {
      levelUpdateNeeded: false, // No update needed
      newLevelData: null,
    };
  }

  // Check for promotion to a higher level
  for (let i = currentLevel; i < levels.length; i++) {
    const nextLevel = levels[i];

    // If the balance meets the requirement for the next level
    if (balance >= nextLevel.balanceRequired) {
      return {
        levelUpdateNeeded: true,
        newLevelData: {
          levelCount: nextLevel.levelCount,
          levelNickname: nextLevel.levelNickname,
        },
      };
    }
  }

  // Check for demotion to a lower level
  for (let i = currentLevel - 1; i >= 0; i--) { // Start checking from the level just below the current one
    const prevLevel = levels[i];

    // If the balance is less than the current level but meets the minimum for a lower level
    if (balance >= prevLevel.balanceRequired) {
      return {
        levelUpdateNeeded: true,
        newLevelData: {
          levelCount: prevLevel.levelCount,
          levelNickname: prevLevel.levelNickname,
        },
      };
    }
  }

  // If no level update is needed, return false
  return { levelUpdateNeeded: false, newLevelData: null };
};

module.exports = checkLevel;