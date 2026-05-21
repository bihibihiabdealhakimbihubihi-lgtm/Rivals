/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function Background() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);

  useEffect(() => {
    // Generate static particles on mount to avoid hydration mismatch/flicker
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden bg-dark-bg">
      {/* Dot Grid Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {/* Dynamic Gradients */}
      <motion.div 
        animate={{ 
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-red-900/10 rounded-full blur-[120px]"
      />
      <motion.div 
        animate={{ 
          x: [0, -40, 0],
          y: [0, 60, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-blue-900/10 rounded-full blur-[150px]"
      />

      {/* Decorative Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.5, 0],
            y: [0, -100, -200],
            x: [0, Math.random() * 50 - 25]
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 10
          }}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.id % 2 === 0 ? '#FF003C' : '#00E5FF',
            borderRadius: '50%',
            filter: 'blur(1px)',
            boxShadow: `0 0 10px ${p.id % 2 === 0 ? 'rgba(255, 0, 60, 0.8)' : 'rgba(0, 229, 255, 0.8)'}`,
          }}
        />
      ))}
    </div>
  );
}
