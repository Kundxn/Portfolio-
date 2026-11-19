import * as React from 'react';
import {useInView, useReducedMotion} from 'motion/react';

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
}

export function AnimatedCounter({target, prefix = '', suffix = ''}: AnimatedCounterProps) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, {once: true, margin: '-40px'});
  const prefersReducedMotion = useReducedMotion();
  const isDecimal = !Number.isInteger(target);
  const [displayValue, setDisplayValue] = React.useState<number>(target);

  React.useEffect(() => {
    if (!isInView || prefersReducedMotion) {
      setDisplayValue(target);
      return;
    }

    const durationMs = 700;
    const startTime = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = target * eased;
      setDisplayValue(isDecimal ? Number(next.toFixed(1)) : Math.round(next));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setDisplayValue(target);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, target, isDecimal, prefersReducedMotion]);

  const formatted = isDecimal ? displayValue.toFixed(1) : displayValue.toString();

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
