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
  if (num >= 1_000_000) return `${Math.floor(num / 1_000_000)}M`; // Format as millions
  if (num >= 1_000) return `${Math.floor(num / 1_000)}K`; // Format as thousands
  return num.toString(); // Return as is if less than 1,000
};

export const formatLevels = (levels: LevelInfo[]): FormattedLevel[] => {
  return levels.map((level) => {
    return {
      level: level.levelCount,
      nickname: level.levelNickname,
      balanceRange: `${formatNumber(level.balanceRequired)}`, // Format without range
    };
  });
};