import React from 'react';

const TopBar = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

  const monthNames = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  return (
    <div className="date-component">
      <p>{day+" "+monthNames[month]+" "+year}</p>
      <div className="date-component-text">
      <p>Student App</p>
      </div>
    </div>
  );
};

export default TopBar;