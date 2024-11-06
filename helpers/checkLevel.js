// Updated levels data based on the given balance requirements
const levels = [
  { levelCount: 1, levelNickname: "Rookie Rush", balanceRequired: 0 },          // 0 to <100,000
  { levelCount: 2, levelNickname: "Novice Nexus", balanceRequired: 100000 },     // 100,000 to <200,000
  { levelCount: 3, levelNickname: "Challenger Circuit", balanceRequired: 200000 }, // 200,000 to <400,000
  { levelCount: 4, levelNickname: "Expert Expedition", balanceRequired: 400000 }, // 400,000 to <600,000
  { levelCount: 5, levelNickname: "Master Mayhem", balanceRequired: 600000 },     // 600,000 to <800,000
  { levelCount: 6, levelNickname: "Pro Power-Up", balanceRequired: 800000 },      // 800,000 to <1,000,000
  { levelCount: 7, levelNickname: "Elite Evasion", balanceRequired: 1000000 },    // 1,000,000 to <2,000,000
  { levelCount: 8, levelNickname: "Legendary Labyrinth", balanceRequired: 2000000 }, // 2,000,000 to <5,000,000
  { levelCount: 9, levelNickname: "Champion's Gauntlet", balanceRequired: 5000000 }, // 5,000,000 to <10,000,000
  { levelCount: 10, levelNickname: "Ultimate Showdown", balanceRequired: 10000000 }  // 10,000,000+
];

// Function to determine if level update is needed
const checkLevel = (balance, currentLevel) => {
  if (balance == null || currentLevel == null || currentLevel < 1 || currentLevel > levels.length) {
      return { levelUpdateNeeded: false, newLevelData: null };
  }

  const nextLevelIndex = currentLevel;  // Array index of the next level
  const currentLevelData = levels[currentLevel - 1];  // Current level object
  const nextLevelData = levels[nextLevelIndex];  // Next level object, if it exists

  // Check if balance meets or exceeds the requirement for the next level
  if (nextLevelData && balance >= nextLevelData.balanceRequired) {
      return {
          levelUpdateNeeded: true,
          newLevelData: {
              levelCount: nextLevelData.levelCount,
              levelNickname: nextLevelData.levelNickname
          }
      };
  }

  // Check if the balance is below the requirement for the current level, implying a demotion
  if (balance < currentLevelData.balanceRequired && currentLevel > 1) {
      const previousLevelData = levels[currentLevel - 2];
      return {
          levelUpdateNeeded: true,
          newLevelData: {
              levelCount: previousLevelData.levelCount,
              levelNickname: previousLevelData.levelNickname
          }
      };
  }

  // No update needed if neither promotion nor demotion conditions are met
  return { levelUpdateNeeded: false, newLevelData: null };
};

module.exports = checkLevel
