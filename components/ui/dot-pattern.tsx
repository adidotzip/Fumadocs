'use client';

import React, { useEffect, useRef } from 'react';

interface DotPatternProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  glow?: boolean;
}

export function DotPattern({
  width = 18,
  height = 18,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  glow = false,
  ...props
}: DotPatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !parent || !ctx) return;

    let animationFrame = 0;
    let widthPx = 0;
    let heightPx = 0;
    let lastTime = -Infinity;
    let color = 'currentColor';
    let active = true;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      widthPx = Math.max(1, Math.ceil(rect.width));
      heightPx = Math.max(1, Math.ceil(rect.height));

      canvas.width = Math.ceil(widthPx * dpr);
      canvas.height = Math.ceil(heightPx * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      color = getComputedStyle(canvas).color || 'currentColor';
      draw();
    };

    const draw = (time = 0) => {
      ctx.clearRect(0, 0, widthPx, heightPx);

      const columns = Math.ceil(widthPx / width);
      const rows = Math.ceil(heightPx / height);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          const px = col * width + cx + x;
          const py = row * height + cy + y;

          if (!glow) {
            ctx.fillStyle = color;
            ctx.globalAlpha = 1;
            ctx.beginPath();
            ctx.arc(px, py, cr, 0, Math.PI * 2);
            ctx.fill();
            continue;
          }

          const phase = ((row * columns + col) * 37) % 5000;
          const progress = ((time + phase) % 3000) / 3000;
          const pulse = (Math.sin(progress * Math.PI * 2) + 1) / 2;

          ctx.globalAlpha = 0.2 + pulse * 0.65;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(px, py, cr * (1 + pulse * 0.7), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
    };

    const tick = (time: number) => {
      if (!active || document.hidden) {
        animationFrame = 0;
        return;
      }

      if (time - lastTime >= 40) {
        lastTime = time;
        draw(time);
      }

      animationFrame = requestAnimationFrame(tick);
    };

    const setActive = (value: boolean) => {
      active = value;
      if (active && glow && !animationFrame) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    const visibilityChange = () => setActive(!document.hidden);
    const observer = new ResizeObserver(resize);
    const intersection = new IntersectionObserver(
      ([entry]) => setActive(entry?.isIntersecting ?? false),
      { rootMargin: '100px' },
    );

    observer.observe(parent);
    intersection.observe(canvas);
    document.addEventListener('visibilitychange', visibilityChange);

    resize();

    if (glow) animationFrame = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      intersection.disconnect();
      document.removeEventListener('visibilitychange', visibilityChange);
      cancelAnimationFrame(animationFrame);
    };
  }, [width, height, x, y, cx, cy, cr, glow]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ''}`}
      {...props}
    />
  );
}
