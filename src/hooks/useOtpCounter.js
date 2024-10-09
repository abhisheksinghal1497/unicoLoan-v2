import { useState, useEffect, useCallback, useMemo } from "react";

const useOtpCounter = (initialSeconds) => {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const startCountDown = useCallback(() => {
    if (!isCountingDown) {
      setSecondsLeft(initialSeconds);
      setIsCountingDown(true);
      setStartTime(Date.now());
    }
  }, [isCountingDown]);

  useEffect(() => {
    let timer;

    if (isCountingDown && startTime) {
      timer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const newSecondsLeft = Math.max(0, initialSeconds - elapsed);
        setSecondsLeft(newSecondsLeft);

        if (newSecondsLeft === 0) {
          clearInterval(timer);
          setIsCountingDown(false);
        }
      }, 1000);
    }

    return () => timer && clearInterval(timer);
  }, [isCountingDown, initialSeconds, startTime]);

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return `${String(minutes).padStart(1, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  }, [secondsLeft]);

  return {secondsLeft, formattedTime, startCountDown};
};

export default useOtpCounter;
