import React, { useState, useEffect } from 'react';

const CountUp = ({ targetNumber }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const increment = 5; // Change this for faster or slower counting
    const intervalTime = 1; // Time between increments in ms

    if (count < targetNumber) {
      const interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount + increment <= targetNumber) {
            return prevCount + increment;
          } else {
            clearInterval(interval);
            return targetNumber;
          }
        });
      }, intervalTime);

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [count, targetNumber]);

  return <p style={{margin: "0px", padding: "0px"}}>{count}</p>;
};

export default CountUp;
