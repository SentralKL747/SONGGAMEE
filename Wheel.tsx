import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { EventOutcome, WheelType } from '../types';

interface WheelProps {
  type: WheelType;
  segments: { outcome: EventOutcome; weight: number }[];
  onSpinEnd: (outcome: EventOutcome) => void;
  isSpinning: boolean;
}

export const Wheel: React.FC<WheelProps> = ({ type, segments, onSpinEnd, isSpinning }) => {
  const [rotation, setRotation] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawWheel();
  }, [segments]);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = center - 5;

    ctx.clearRect(0, 0, size, size);

    const totalWeight = segments.reduce((sum, s) => sum + s.weight, 0);
    let currentAngle = -Math.PI / 2; // Start from top

    segments.forEach((segment) => {
      const angle = (segment.weight / totalWeight) * 2 * Math.PI;
      
      // Draw sector
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, currentAngle, currentAngle + angle);
      ctx.fillStyle = segment.outcome.color || '#333';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Text
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(currentAngle + angle / 2);
      
      // Calculate text position (about 2/3 out)
      const textDist = radius * 0.65;
      ctx.translate(textDist, 0);
      
      // Rotate back so text is horizontal
      ctx.rotate(-(currentAngle + angle / 2));
      
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#fff';
      
      // Dynamic font size based on wheel size and segment width
      const wheelScale = size / 500;
      const segmentWidth = angle * textDist;
      const fontSize = Math.max(10, Math.min(18 * wheelScale, segmentWidth * 0.8));
      
      ctx.font = `black ${fontSize}px Inter, sans-serif`;
      
      const label = segment.outcome.shortText || segment.outcome.text;
      const emoji = segment.outcome.icon || segment.outcome.emoji;
      
      // Draw emoji slightly above text
      ctx.font = `${fontSize * 1.2}px serif`;
      ctx.fillText(emoji, 0, -fontSize * 0.6);
      
      // Draw text
      ctx.font = `900 ${fontSize * 0.8}px Inter, sans-serif`;
      ctx.fillText(label.toUpperCase(), 0, fontSize * 0.6);
      
      ctx.restore();

      currentAngle += angle;
    });

    // Center decoration
    ctx.beginPath();
    ctx.arc(center, center, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  useEffect(() => {
    if (isSpinning) {
      const extraSpins = 8 + Math.random() * 5;
      const spinDegrees = extraSpins * 360 + Math.random() * 360;
      const finalRotation = rotation + spinDegrees;
      setRotation(finalRotation);

      const timeout = setTimeout(() => {
        const normalizedRotation = (finalRotation % 360);
        const totalWeight = segments.reduce((sum, s) => sum + s.weight, 0);
        
        // The pointer is at the top (270 degrees in canvas coordinates if 0 is right)
        // But we started drawing at -90deg (top).
        // So the wheel is rotated by R. The point at top (relative to wheel) is at -R.
        // We want to find which segment contains angle -R.
        
        let targetAngle = -normalizedRotation % 360;
        if (targetAngle < 0) targetAngle += 360;
        
        const targetRad = (targetAngle * Math.PI) / 180;
        
        let currentRad = 0;
        let selectedOutcome = segments[0].outcome;
        
        for (const segment of segments) {
          const angleRad = (segment.weight / totalWeight) * 2 * Math.PI;
          if (targetRad >= currentRad && targetRad < currentRad + angleRad) {
            selectedOutcome = segment.outcome;
            break;
          }
          currentRad += angleRad;
        }
        
        onSpinEnd(selectedOutcome);
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [isSpinning]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-[90vw]">
      {/* Pointer */}
      <div className="absolute top-0 z-20 -mt-2">
        <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
      </div>
      
      <div className="relative p-2 rounded-full border-4 border-white/10 bg-zinc-900 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <motion.div
          animate={{ rotate: rotation }}
          transition={{ duration: isSpinning ? 4 : 0, ease: [0.15, 0, 0.15, 1] }}
          className="rounded-full overflow-hidden"
        >
          <canvas
            ref={canvasRef}
            width={500}
            height={500}
            className="block w-full h-full max-w-[400px] max-h-[400px]"
          />
        </motion.div>
      </div>
      
      <div className="mt-8 text-center">
        <div className="inline-block px-4 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-2">
          <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Current Spin</p>
        </div>
        <h3 className="text-2xl font-black text-white uppercase tracking-widest italic">{type.replace(/_/g, ' ')}</h3>
      </div>
    </div>
  );
};
