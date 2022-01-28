import { useCallback, useEffect, useRef, useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

function getAnimationSettings(angle: number, originX: number) {
  return {
    particleCount: 6,
    startVelocity: 6,
    spread: 600,
    decay: 0.95,
    ticks: 300,
    gravity: 0.7,
    origin: {
      x: Math.random(),
      y: 0,
    },
    colors: ["#1572A1", "#FA4EAB", "#FFC900", "#EA5C2B", "#95CD41"],
    shapes: ["circle", "square"],
    scalar: 1.1,
  };
}

export default function Confetti({ active }: { active: boolean; }) {
  const refAnimationInstance = useRef(null as any);
  const [intervalId, setIntervalId] = useState(undefined as any);

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(60, 0));
      refAnimationInstance.current(getAnimationSettings(120, 1));
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 300));
    }
  }, [nextTickAnimation, intervalId]);

  const pauseAnimation = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(null);
  }, [intervalId]);

  const stopAnimation = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(null);
    refAnimationInstance.current && refAnimationInstance.current.reset();
  }, [intervalId]);

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  useEffect(() => {
    if (active) {
      startAnimation();
    } else {
      pauseAnimation();
    }
    return () => {
      stopAnimation();
    };
  }, [active])

  return (
    <div style={{
      position: "absolute",
      top: "0",
      zIndex: 2000
    }}>
      <ReactCanvasConfetti
        refConfetti={getInstance}
        style={{
          position: "fixed",
          pointerEvents: "none",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
}
