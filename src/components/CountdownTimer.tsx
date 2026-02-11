import { useState, useEffect } from "react";

const LAUNCH_DATE = new Date("2026-03-01T00:00:00").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const diff = Math.max(LAUNCH_DATE - Date.now(), 0);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const blocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-3 sm:gap-4">
      {blocks.map((block, i) => (
        <div
          key={block.label}
          className="flex flex-col items-center rounded-xl border border-border bg-card/70 backdrop-blur-xl px-3 py-4 sm:px-5 sm:py-5 min-w-[68px] sm:min-w-[88px] glow-box"
        >
          <span className="font-display text-2xl sm:text-4xl font-bold text-gradient tabular-nums leading-none">
            {String(block.value).padStart(2, "0")}
          </span>
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-2 font-medium">
            {block.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
