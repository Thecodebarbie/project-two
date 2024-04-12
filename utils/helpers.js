module.exports = {
    formatDate: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    },
    formatTime: (date) => {
      // ? We use the 'toLocaleTimeString()' method to format the time as H:MM:SS AM/PM
      return date.toLocaleTimeString();
    },
  };
  