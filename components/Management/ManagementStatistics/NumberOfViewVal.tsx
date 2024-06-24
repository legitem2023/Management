import React, { useEffect, useState } from 'react'

const NumberOfViewVal = (targetValue: any) => {
  const [currentValue, setCurrentValue] = useState(0);
  const target = targetValue.targetValue;//NumberOFViews.getNumberOfViews.length;
  const incrementValue = () => {
    setCurrentValue((prevValue) => prevValue + 1);
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentValue < target) {
        incrementValue();
      } else {
        clearInterval(intervalId);
      }
    }, 10);
    return () => clearInterval(intervalId);
  }, [currentValue, target]);

  return (
    <div>{currentValue}</div>
  )
}

export default NumberOfViewVal