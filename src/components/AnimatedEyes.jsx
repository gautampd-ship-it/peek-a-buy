// src/components/AnimatedEyes.jsx
import React from "react";

/**
 * AnimatedEyes.jsx
 * Inline SVG eyes with transparent background and natural blinking.
 * Usage: import AnimatedEyes from './components/AnimatedEyes';
 *        <AnimatedEyes width={140} height={44} />
 */

export default function AnimatedEyes({ width = 140, height = 44 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 300 80"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Peek-a-Buy animated eyes"
      style={{ display: "block", overflow: "visible" }}
    >
      <style>{`
        /* subtle glance for pupils */
        @keyframes glance {
          0%   { transform: translateX(0); }
          8%   { transform: translateX(-1.5px); }
          14%  { transform: translateX(1.2px); }
          20%  { transform: translateX(0); }
          100% { transform: translateX(0); }
        }
        /* eyelid blink */
        @keyframes eyelid {
          0%   { transform: scaleY(1); }
          4%   { transform: scaleY(0.04); }
          7%   { transform: scaleY(1); }
          100% { transform: scaleY(1); }
        }
        .pupil { transform-origin:center; animation: glance 3.8s infinite ease-in-out; }
        .eyelid { transform-origin:center; animation: eyelid 3.8s infinite cubic-bezier(.3,.0,.25,1); }
        .eye-right .eyelid { animation-delay: 0.22s; }
        /* sparkle occasionally */
        @keyframes sparkle { 0%{opacity:0} 45%{opacity:0} 48%{opacity:1} 52%{opacity:0} 100%{opacity:0} }
        .sparkle { animation: sparkle 6.2s infinite ease-in-out; transform-origin:center; opacity:0; }
      `}</style>

      {/* Logo text */}
      <text x="14" y="50" fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial"
            fontWeight="800" fontSize="28" fill="#FFD166">
        Peek-a-Buy
      </text>

      {/* Eyes group positioned to the right of the text */}
      <g id="eyes" transform="translate(200,22)">
        {/* LEFT EYE */}
        <g className="eye left" transform="translate(-38,0)">
          <ellipse cx="0" cy="12" rx="21" ry="14" fill="#FFFFFF" stroke="#E6EEF6" strokeWidth="1"/>
          <g className="eyelid" transform="translate(0,12)">
            <rect x="-21" y="-14" width="42" height="28" rx="14" ry="14" fill="#071522" opacity="1"></rect>
          </g>
          <g className="pupil" transform="translate(0,12)">
            <circle cx="-1.5" cy="0" r="6.2" fill="#071522"/>
            <circle cx="-3.1" cy="-1.4" r="1.3" fill="#F8FAFC" className="sparkle"/>
          </g>
        </g>

        {/* RIGHT EYE */}
        <g className="eye right" transform="translate(0,0)">
          <ellipse cx="0" cy="12" rx="21" ry="14" fill="#FFFFFF" stroke="#E6EEF6" strokeWidth="1"/>
          <g className="eyelid" transform="translate(0,12)">
            <rect x="-21" y="-14" width="42" height="28" rx="14" ry="14" fill="#071522" opacity="1"></rect>
          </g>
          <g className="pupil" transform="translate(0,12)">
            <circle cx="1.5" cy="0" r="6.2" fill="#071522"/>
            <circle cx="0.3" cy="-1.0" r="1.1" fill="#F8FAFC" className="sparkle"/>
          </g>
        </g>
      </g>

      {/* Tagline */}
      <text x="14" y="68" fontSize="9" fill="#77829A" fontFamily="Inter, Arial">Compare dish prices & ratings — Bangalore prototype</text>
    </svg>
  );
}
