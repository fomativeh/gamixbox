module.exports = isDifferentDay = (dateString) => {
    const givenDate = new Date(dateString); // Parse the string to a Date object
    const today = new Date();
  
    // Compare year, month, and day
    return (
      givenDate.getFullYear() !== today.getFullYear() ||
      givenDate.getMonth() !== today.getMonth() ||
      givenDate.getDate() !== today.getDate()
    );
  }