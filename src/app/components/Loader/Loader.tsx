import React, { useEffect, useState } from 'react';

const Loader = () => {
  const [glowColor, setGlowColor] = useState('#fff'); // Default color

  // Function to generate a random color excluding white and black
  const getRandomColor = () => {
    let color;
    do {
      color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    } while (color === '#ffffff' || color === '#000000');
    return color;
  };

  // Change the glow color every 500 milliseconds
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowColor(getRandomColor());
    }, 500);
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div
      className="loader"
      style={{ boxShadow: `0 0 0 7.5px ${glowColor} inset` }} // Apply random color
    >
      <div className="loader-inner" />
      <div className="loader-inner loader-inner-after" />
    </div>
  );
};

export default Loader;
