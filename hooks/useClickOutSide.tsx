import { useEffect, useRef } from "react";

const useClickOutSide = (callback: any) => {
  const innerRef = useRef<HTMLElement>(null);

  const handleClick = (e: MouseEvent) => {
    if (
      innerRef.current &&
      !innerRef.current.contains(e.target as HTMLDivElement)
    ) {
      callback && callback();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return innerRef;
};
export default useClickOutSide;
