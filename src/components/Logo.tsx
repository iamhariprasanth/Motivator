export default function Logo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle with gradient border */}
      <circle
        cx="100"
        cy="100"
        r="95"
        fill="url(#outerGradient)"
        stroke="url(#borderGradient)"
        strokeWidth="8"
      />

      {/* Inner circle */}
      <circle
        cx="100"
        cy="100"
        r="80"
        fill="url(#innerGradient)"
        stroke="#FFD700"
        strokeWidth="3"
      />

      {/* Four-leaf clover */}
      <g transform="translate(100, 100)">
        {/* Top leaf */}
        <path
          d="M 0,-25 Q -15,-40 -10,-55 Q -5,-65 0,-60 Q 5,-65 10,-55 Q 15,-40 0,-25"
          fill="url(#leafGradient)"
          stroke="#FFD700"
          strokeWidth="2"
        />

        {/* Right leaf */}
        <path
          d="M 25,0 Q 40,-15 55,-10 Q 65,-5 60,0 Q 65,5 55,10 Q 40,15 25,0"
          fill="url(#leafGradient)"
          stroke="#FFD700"
          strokeWidth="2"
        />

        {/* Bottom leaf */}
        <path
          d="M 0,25 Q 15,40 10,55 Q 5,65 0,60 Q -5,65 -10,55 Q -15,40 0,25"
          fill="url(#leafGradient)"
          stroke="#FFD700"
          strokeWidth="2"
        />

        {/* Left leaf */}
        <path
          d="M -25,0 Q -40,15 -55,10 Q -65,5 -60,0 Q -65,-5 -55,-10 Q -40,-15 -25,0"
          fill="url(#leafGradient)"
          stroke="#FFD700"
          strokeWidth="2"
        />

        {/* Center circle */}
        <circle cx="0" cy="0" r="8" fill="#FFD700" />

        {/* Stem */}
        <path
          d="M 0,8 Q 5,20 8,35"
          stroke="#2D5016"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* Sparkles */}
      <circle cx="60" cy="40" r="3" fill="#FFD700" opacity="0.8" />
      <circle cx="140" cy="50" r="2.5" fill="#FFD700" opacity="0.8" />
      <circle cx="150" cy="140" r="3" fill="#FFD700" opacity="0.8" />
      <circle cx="50" cy="150" r="2" fill="#FFD700" opacity="0.8" />
      <circle cx="100" cy="30" r="2" fill="#FFD700" opacity="0.8" />
      <circle cx="170" cy="100" r="2.5" fill="#FFD700" opacity="0.8" />

      {/* Gradients */}
      <defs>
        <linearGradient id="outerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#047857" />
          <stop offset="50%" stopColor="#059669" />
          <stop offset="100%" stopColor="#064e3b" />
        </linearGradient>

        <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>

        <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#065f46" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>

        <linearGradient id="leafGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="50%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
      </defs>
    </svg>
  );
}
