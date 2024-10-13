import { useState, useEffect } from 'react';

const useTimer = (initialTime, onComplete) => {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            if (onComplete) {
              onComplete(formatTime(initialTime)); // Notify parent with the initial formatted time
            }
            return 0; // Stop the timer
          }
          return prevTime - 1; // Decrement time
        });
      }, 1000);
    } else if (!isActive) {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [isActive, time, onComplete, initialTime]);

  const start = () => setIsActive(true);
  const pause = () => setIsActive(false);
  const reset = () => {
    setIsActive(false);
    setTime(initialTime);
  };

  return { time, start, pause, reset, isActive }; // Return isActive to allow button logic
};

// Helper function to format time
const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export default useTimer;
