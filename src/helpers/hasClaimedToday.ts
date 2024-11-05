export const hasClaimedToday = (dateString: Date) => {
  const givenDate = new Date(dateString); // Parse the string to a Date object
  const today = new Date();

  // Return true if the year, month, and day all match, meaning it's the same day
  return (
    givenDate.getFullYear() === today.getFullYear() &&
    givenDate.getMonth() === today.getMonth() &&
    givenDate.getDate() === today.getDate()
  );
};

// console.log(hasClaimedToday("2024-11-04T19:21:09.600+00:00"))