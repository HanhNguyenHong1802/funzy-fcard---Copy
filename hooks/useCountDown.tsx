import { destroyCookie, parseCookies, setCookie } from "nookies";
import { useEffect, useState } from "react";
import { timeSecondsDistance } from "../utils";

const useCountdown = (
  time: number,
  run = false,
  restart: Function,
  name = ""
) => {
  const [countDown, setCountDown] = useState(time);
  const cookies = parseCookies();
  const activetime = cookies[name];

  useEffect(() => {
    if (activetime && name) {
      setCountDown(time - timeSecondsDistance(activetime));
      restart && restart(true);
    }
  }, [activetime]);

  useEffect(() => {
    if (run || (activetime && name)) {
      !activetime &&
        name &&
        setCookie(null, name, JSON.stringify(new Date().getTime()));
      const interval = setInterval(() => {
        setCountDown((x) => x - 1);
      }, 1000);
      if (countDown <= 0) {
        clearInterval(interval);
        setCountDown(time);
        name && destroyCookie(null, name);
        restart && restart(false);
      }
      return () => clearInterval(interval);
    }
    return;
  }, [time, run, countDown, activetime]);

  return countDown;
};

export default useCountdown;
