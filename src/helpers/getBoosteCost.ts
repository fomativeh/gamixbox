export const getBoosterCost = ( type: number): number | null =>{
    const boosterCosts: { [key: number]: number } = {
      2: 10000,
      3: 15000,
      4: 20000,
      5: 25000,
      6: 30000,
      7: 35000,
      8: 40000,
      9: 45000,
      10: 50000,
    };
  
    return boosterCosts[type] ?? null;
  }