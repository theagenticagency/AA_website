import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Elegant floating geometric shapes for high-end visual effect
 * Variants: 'light' (for cement backgrounds), 'dark' (for black backgrounds)
 */
const FloatingShapes = ({ variant = 'light', className = '' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const shapes = containerRef.current.querySelectorAll('.floating-shape');

    shapes.forEach((shape, i) => {
      // Unique floating animation for each shape
      gsap.to(shape, {
        y: `${15 + (i * 5)}`,
        x: `${5 + (i * 3)}`,
        rotation: 5 + (i * 2),
        duration: 4 + (i * 0.5),
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: i * 0.3
      });
    });

    return () => {
      shapes.forEach(shape => gsap.killTweensOf(shape));
    };
  }, []);

  const isDark = variant === 'dark';
  const shapeColor = isDark ? 'rgba(230, 230, 225, 0.03)' : 'rgba(0, 0, 0, 0.02)';
  const strokeColor = isDark ? 'rgba(230, 230, 225, 0.08)' : 'rgba(0, 0, 0, 0.04)';

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Large circle - top right */}
      <div
        className="floating-shape absolute -top-32 -right-32 w-96 h-96 rounded-full"
        style={{
          background: `radial-gradient(circle, ${shapeColor} 0%, transparent 70%)`,
          border: `1px solid ${strokeColor}`
        }}
      />

      {/* Medium square - rotated, bottom left */}
      <div
        className="floating-shape absolute -bottom-20 -left-20 w-64 h-64 rotate-12"
        style={{
          background: shapeColor,
          border: `1px solid ${strokeColor}`
        }}
      />

      {/* Small circle - center right */}
      <div
        className="floating-shape absolute top-1/2 -right-16 w-32 h-32 rounded-full"
        style={{
          background: shapeColor,
          border: `1px solid ${strokeColor}`
        }}
      />

      {/* Thin horizontal line */}
      <div
        className="floating-shape absolute top-1/3 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${strokeColor}, transparent)` }}
      />

      {/* Small diamond - top left */}
      <div
        className="floating-shape absolute top-24 left-1/4 w-16 h-16 rotate-45"
        style={{
          background: shapeColor,
          border: `1px solid ${strokeColor}`
        }}
      />
    </div>
  );
};

/**
 * Animated grid pattern that subtly pulses
 */
export const AnimatedGrid = ({ variant = 'light', className = '' }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return;

    gsap.to(gridRef.current, {
      opacity: 0.6,
      duration: 3,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });
  }, []);

  const isDark = variant === 'dark';
  const gridColor = isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';

  return (
    <div
      ref={gridRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(${gridColor} 1px, transparent 1px),
          linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px'
      }}
    />
  );
};

/**
 * Gradient orb that follows scroll or floats
 */
export const GlowOrb = ({
  color = 'rgba(230, 230, 225, 0.08)',
  size = 600,
  position = 'center',
  blur = 150,
  className = ''
}) => {
  const orbRef = useRef(null);

  useEffect(() => {
    if (!orbRef.current) return;

    gsap.to(orbRef.current, {
      scale: 1.1,
      duration: 8,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });
  }, []);

  const positionStyles = {
    center: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
    topRight: { top: '-20%', right: '-10%' },
    bottomLeft: { bottom: '-20%', left: '-10%' },
    topLeft: { top: '-20%', left: '-10%' },
    bottomRight: { bottom: '-20%', right: '-10%' },
  };

  return (
    <div
      ref={orbRef}
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        ...positionStyles[position]
      }}
    />
  );
};

/**
 * Decorative corner accents
 */
export const CornerAccents = ({ variant = 'light', className = '' }) => {
  const isDark = variant === 'dark';
  const lineColor = isDark ? 'rgba(230, 230, 225, 0.15)' : 'rgba(0, 0, 0, 0.08)';

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Top left corner */}
      <div className="absolute top-8 left-8">
        <div className="w-16 h-px" style={{ background: lineColor }} />
        <div className="w-px h-16" style={{ background: lineColor }} />
      </div>

      {/* Top right corner */}
      <div className="absolute top-8 right-8">
        <div className="w-16 h-px ml-auto" style={{ background: lineColor }} />
        <div className="w-px h-16 ml-auto" style={{ background: lineColor }} />
      </div>

      {/* Bottom left corner */}
      <div className="absolute bottom-8 left-8">
        <div className="w-px h-16" style={{ background: lineColor }} />
        <div className="w-16 h-px" style={{ background: lineColor }} />
      </div>

      {/* Bottom right corner */}
      <div className="absolute bottom-8 right-8">
        <div className="w-px h-16 ml-auto" style={{ background: lineColor }} />
        <div className="w-16 h-px ml-auto" style={{ background: lineColor }} />
      </div>
    </div>
  );
};

/**
 * Animated section divider
 */
export const SectionDivider = ({ variant = 'light', className = '' }) => {
  const lineRef = useRef(null);

  useEffect(() => {
    if (!lineRef.current) return;

    gsap.fromTo(lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: lineRef.current,
          start: 'top 85%'
        }
      }
    );
  }, []);

  const isDark = variant === 'dark';
  const lineColor = isDark ? 'rgba(230, 230, 225, 0.2)' : 'rgba(0, 0, 0, 0.1)';

  return (
    <div className={`w-full flex justify-center py-8 ${className}`}>
      <div
        ref={lineRef}
        className="w-32 h-px origin-center"
        style={{ background: lineColor }}
      />
    </div>
  );
};

export default FloatingShapes;
