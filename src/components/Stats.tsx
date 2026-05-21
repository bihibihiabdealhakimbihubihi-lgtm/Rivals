/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useSpring, useTransform, animate } from 'motion/react';
import { useEffect, useState } from 'react';
import { Stat } from '../types';

interface CounterProps {
  value: number;
  suffix?: string;
}

function Counter({ value, suffix }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 3,
      onUpdate(value) {
        setCount(Math.floor(value));
      },
    });
    return () => controls.stop();
  }, [value]);

  return (
    <span className="font-display text-2xl sm:text-3xl font-bold tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Stats({ stats }: { stats: Stat[] }) {
  const colors = [
    { text: 'text-brand-blue', bg: 'bg-blue-900/20', border: 'border-blue-500/30' },
    { text: 'text-brand-purple', bg: 'bg-purple-900/20', border: 'border-purple-500/30' },
    { text: 'text-brand-green', bg: 'bg-green-900/20', border: 'border-green-500/30' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-3xl">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * idx }}
          className={`${colors[idx % colors.length].bg} ${colors[idx % colors.length].border} backdrop-blur-md border p-4 rounded-lg flex flex-col items-center justify-center text-center gap-1 transition-all duration-500`}
        >
          <span className={`text-[10px] ${colors[idx % colors.length].text} uppercase tracking-widest font-bold`}>
            {stat.label}
          </span>
          <div className="text-white">
            <Counter value={stat.value} suffix={stat.suffix} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
