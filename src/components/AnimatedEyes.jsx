// src/components/AnimatedEyes.jsx
import React from "react";

/**
 * AnimatedEyes - eyes-only SVG (transparent background)
 * Usage: <AnimatedEyes width={44} height={44} />
 * This component intentionally does NOT include any text so it won't overlap header typography.
 */

export default function AnimatedEyes({ width = 44, height = 44 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 44"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Peek-a-Buy animated eyes"
      style={{ display: "block", verticalAlign: "middle" }}
    >
      <style>{`
        /* slight pupil glance */
        @keyframes glance { 0%{transform:translateX(0)} 8%{transform:translateX(-1.2px)} 14%{transform:translateX(1px)} 20%{transform:translateX(0)} 100%{transform:translateX(0)} }
        /* eyelid blink */
        @keyframes eyelid { 0%{transform:scaleY(1)} 4%{transform:scaleY(0.04)} 7%{transform:scaleY(1)} 100%{transform:scaleY(1)} }
        .pupil { transform-origin: center; animation: glance 3.8s infinite ease-in-out; }
        .eyelid { transform-origin: center; animation: eyelid 3.8s infinite cubic-bezier(.3,.0,.25,1); }
        .eye-right .eyelid { animation-delay: 0.22s; }
        .sparkle { animation: sparkle 6s infinite ease-in-out; transform-origin:center; opacity:0; }
        @keyframes sparkle { 0%{opacity:0} 48%{opacity:1} 52%{opacity:0} 100%{opacity:0} }
      `}</style>

      {/* Left eye (positioned at x = 24) */}
      <g transform="translate(24,0)" className="eye-left">
        <ellipse cx="0" cy="22" rx="18" ry="14" fill="#fff" stroke="#E6EEF6" strokeWidth="1"/>
        <g className="eyelid" transform="translate(0,22)">
          <rect x="-18" y="-14" width="36" height="28" rx="14" ry="14" fill="#071522" opacity="1"></rect>
        </g>
        <g className="pupil" transform="translate(0,22)">
          <circle cx="-1.8" cy="0" r="5.6" fill="#071522"/>
          <circle cx="-3.0" cy="-1.3" r="1.1" fill="#F8FAFC" className="sparkle"/>
        </g>
      </g>

      {/* Right eye (positioned at x = 84) */}
      <g transform="translate(84,0)" className="eye-right">
        <ellipse cx="0" cy="22" rx="18" ry="14" fill="#fff" stroke="#E6EEF6" strokeWidth="1"/>
        <g className="eyelid" transform="translate(0,22)">
          <rect x="-18" y="-14" width="36" height="28" rx="14" ry="14" fill="#071522" opacity="1"></rect>
        </g>
        <g className="pupil" transform="translate(0,22)">
          <circle cx="1.8" cy="0" r="5.6" fill="#071522"/>
          <circle cx="0.4" cy="-1.0" r="1.0" fill="#F8FAFC" className="sparkle"/>
        </g>
      </g>
    </svg>
  );
}
