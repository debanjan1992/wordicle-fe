import { useEffect, useRef } from "react";

const useKey = (cb: (e: KeyboardEvent) => any) => {
  const callbackRef = useRef(cb);

  useEffect(() => {
    callbackRef.current = cb;
  });

  useEffect(() => {
    function handle(event: KeyboardEvent) {
      callbackRef.current(event);
    }
    document.addEventListener("keyup", handle);
    return () => document.removeEventListener("keyup", handle);
  });
};

export default useKey;
