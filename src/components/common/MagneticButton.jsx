import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

const MagneticButton = ({ children, className = '', onClick, to, href, type = 'button' }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const move = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
      gsap.to(btn, { x, y, scale: 1.03, duration: 0.4, ease: "power2.out" });
    };
    const leave = () => {
      gsap.to(btn, { x: 0, y: 0, scale: 1, duration: 0.7, ease: "elastic.out(1, 0.3)" });
    };

    btn.addEventListener('mousemove', move);
    btn.addEventListener('mouseleave', leave);
    return () => {
      btn.removeEventListener('mousemove', move);
      btn.removeEventListener('mouseleave', leave);
    };
  }, []);

  const baseClasses = `relative overflow-hidden group rounded-xl ${className}`;
  const innerContent = (
    <>
      <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-magnetic"></span>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  // If it's a router link
  if (to) {
    return (
      <Link ref={buttonRef} to={to} className={baseClasses}>
        {innerContent}
      </Link>
    );
  }

  // If it's an external link
  if (href) {
    return (
      <a ref={buttonRef} href={href} className={baseClasses}>
        {innerContent}
      </a>
    );
  }

  // Default: button
  return (
    <button ref={buttonRef} type={type} onClick={onClick} className={baseClasses}>
      {innerContent}
    </button>
  );
};

export default MagneticButton;
