export const monthNameToNumber = (monthName) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months.indexOf(monthName) + 1; // Return the corresponding month number (1-12)
  };
  