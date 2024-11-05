export const getHighestNumber = (numbers: number[]): number | null =>{
    if (numbers.length === 0) return null; // Return null for empty array
    return Math.max(...numbers);
  }
  