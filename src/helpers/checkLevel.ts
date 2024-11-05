export const levelsForLevelModal = [
    { levelCount: 1, levelNickname: "Rookie Rush", balanceRequired: 50000 }, // Start from 50K
    { levelCount: 2, levelNickname: "Novice Nexus", balanceRequired: 100000 },
    { levelCount: 3, levelNickname: "Challenger Circuit", balanceRequired: 200000 },
    { levelCount: 4, levelNickname: "Expert Expedition", balanceRequired: 400000 },
    { levelCount: 5, levelNickname: "Master Mayhem", balanceRequired: 600000 },
    { levelCount: 6, levelNickname: "Pro Power-Up", balanceRequired: 800000 },
    { levelCount: 7, levelNickname: "Elite Evasion", balanceRequired: 1000000 },
    { levelCount: 8, levelNickname: "Legendary Labyrinth", balanceRequired: 2000000 },
    { levelCount: 9, levelNickname: "Champion's Gauntlet", balanceRequired: 5000000 }, // Set to 5M
    { levelCount: 10, levelNickname: "Ultimate Showdown", balanceRequired: 10000000 } // Keep as is
];

const levels = [
    { levelCount: 1, levelNickname: "Rookie Rush", balanceRequired: 0 },
    { levelCount: 2, levelNickname: "Novice Nexus", balanceRequired: 50000 },
    { levelCount: 3, levelNickname: "Challenger Circuit", balanceRequired: 100000 },
    { levelCount: 4, levelNickname: "Expert Expedition", balanceRequired: 200000 },
    { levelCount: 5, levelNickname: "Master Mayhem", balanceRequired: 400000 },
    { levelCount: 6, levelNickname: "Pro Power-Up", balanceRequired: 600000 },
    { levelCount: 7, levelNickname: "Elite Evasion", balanceRequired: 800000 },
    { levelCount: 8, levelNickname: "Legendary Labyrinth", balanceRequired: 1000000 },
    { levelCount: 9, levelNickname: "Champion's Gauntlet", balanceRequired: 2000000 },
    { levelCount: 10, levelNickname: "Ultimate Showdown", balanceRequired: 10000000 } 
  ];


// Function to determine if level update is needed
export const checkLevel = (balance: number, currentLevel: number) => {
    if (balance == null || currentLevel == null || currentLevel < 1 || currentLevel > levels.length) {
        return { levelUpdateNeeded: false, newLevelData: null };
    }

    // If the user is at level 1 and balance is below 50,000, no update is needed
    if (currentLevel === 1 && balance < levels[1].balanceRequired) {
        return { levelUpdateNeeded: false, newLevelData: null };
    }

    // Check for promotion to a higher level
    for (let i = currentLevel; i < levels.length; i++) {
        const nextLevel = levels[i];
        if (balance >= nextLevel.balanceRequired) {
            return {
                levelUpdateNeeded: true,
                newLevelData: {
                    levelCount: nextLevel.levelCount,
                    levelNickname: nextLevel.levelNickname
                }
            };
        }
    }

    // Check for demotion to a lower level
    for (let i = currentLevel - 2; i >= 0; i--) {
        const prevLevel = levels[i];
        if (balance >= prevLevel.balanceRequired) {
            return {
                levelUpdateNeeded: true,
                newLevelData: {
                    levelCount: prevLevel.levelCount,
                    levelNickname: prevLevel.levelNickname
                }
            };
        }
    }

    // If no level update is needed, return false
    return { levelUpdateNeeded: false, newLevelData: null };
};
