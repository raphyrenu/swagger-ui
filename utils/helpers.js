exports.formatDate = (date) => {
    return date.toISOString().slice(0, 10);
  };
  
  exports.formatTime = (date) => {
    return date.toISOString().slice(11, 19);
  };
  