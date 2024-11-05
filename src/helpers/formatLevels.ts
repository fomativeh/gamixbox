type LevelInfo = {
    levelCount: number;
    levelNickname: string;
    balanceRequired: number;
  };
  
  type FormattedLevel = {
    level: number;
    nickname: string;
    balanceRange: string;
  };
  
  const formatNumber = (num: number): string => {
    if (num >= 1_000_000) return `${Math.floor(num / 1_000_000)}M`;
    if (num >= 1_000) return `${Math.floor(num / 1_000)}K`;
    return num.toString();
  };
  
export  const formatLevels = (levels: LevelInfo[]): FormattedLevel[] => {
    return levels.map((level, index) => {
      const nextLevelBalance = levels[index + 1]?.balanceRequired || level.balanceRequired * 2;
      const balanceRange = `${formatNumber(level.balanceRequired)}-${formatNumber(nextLevelBalance - 1)}`;
  
      return {
        level: level.levelCount,
        nickname: level.levelNickname,
        balanceRange,
      };
    });
  };