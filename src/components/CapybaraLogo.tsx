import React, { useId } from 'react';

interface CapybaraLogoProps {
  size?: number;
  className?: string;
  showAura?: boolean;
}

export const CapybaraLogo: React.FC<CapybaraLogoProps> = ({
  size = 40,
  className = '',
  showAura = true,
}) => {
  const rawId = useId();
  const safeId = rawId.replace(/:/g, '');
  const gradId = `capybara-grad-${safeId}`;
  const auraGlowId = `capybara-aura-${safeId}`;

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {showAura && (
        <span
          aria-hidden="true"
          style={{
            background:
              'conic-gradient(from 45deg, #4285F4, #9B72CB, #D96570, #EA4335, #FBBC04, #34A853, #4285F4)',
          }}
          className="pointer-events-none absolute inset-0 rounded-full opacity-0 blur-md transition-all duration-500 ease-out group-hover:scale-110 group-hover:opacity-35 motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-hover:opacity-0"
        />
      )}

      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Biểu tượng Linh thú Capybara"
        className="relative z-10 overflow-visible"
      >
        <defs>
          <linearGradient
            id={gradId}
            x1="4"
            y1="4"
            x2="44"
            y2="44"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#4285F4" />
            <stop offset="24%" stopColor="#9B72CB" />
            <stop offset="48%" stopColor="#D96570" />
            <stop offset="66%" stopColor="#EA4335" />
            <stop offset="84%" stopColor="#FBBC04" />
            <stop offset="100%" stopColor="#34A853" />
          </linearGradient>

          <radialGradient id={auraGlowId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4285F4" stopOpacity="0.22" />
            <stop offset="60%" stopColor="#9B72CB" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#34A853" stopOpacity="0" />
          </radialGradient>
        </defs>

        {showAura && (
          <g
            style={{ transformOrigin: '24px 24px', transformBox: 'view-box' }}
            className="transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          >
            <circle
              cx="24"
              cy="24"
              r="20.75"
              fill={`url(#${auraGlowId})`}
              className="opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 motion-reduce:transition-none"
            />
            <path
              d="M 33.74 5.68 A 20.75 20.75 0 1 1 14.26 5.68"
              stroke={`url(#${gradId})`}
              strokeWidth="1.45"
              strokeLinecap="round"
              opacity="0.78"
              className="transition-opacity duration-300 ease-out group-hover:opacity-100 motion-reduce:transition-none"
            />
            <path
              d="M 33.79 9.49 A 17.5 17.5 0 1 1 14.21 9.49"
              stroke="currentColor"
              strokeOpacity="0.18"
              strokeWidth="0.75"
              strokeDasharray="1.8 3.2"
              strokeLinecap="round"
            />
          </g>
        )}

        <g
          style={{ transformOrigin: '24px 9.2px', transformBox: 'view-box' }}
          className="transition-transform duration-500 ease-out group-hover:rotate-90 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:transform-none"
        >
          <path
            d="M 24 4.6 C 24.42 7.65 25.55 8.78 28.6 9.2 C 25.55 9.62 24.42 10.75 24 13.8 C 23.58 10.75 22.45 9.62 19.4 9.2 C 22.45 8.78 23.58 7.65 24 4.6 Z"
            fill={`url(#${gradId})`}
          />
        </g>

        <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M 13.8 35.8 C 13.1 30.0 13.6 24.4 15.6 21.0 C 14.5 18.2 15.0 15.8 17.1 15.7 C 18.7 15.6 19.4 17.3 19.0 19.2 C 22.8 17.9 28.4 18.5 32.8 20.3 C 34.8 21.1 35.7 22.5 35.7 24.9 L 35.4 28.8 C 35.3 31.3 33.5 32.6 30.3 32.6 C 27.9 32.6 26.2 33.2 25.5 34.4 C 25.1 35.0 25.1 35.4 25.2 35.8"
            strokeWidth="2.05"
          />

          <path
            d="M 12.2 35.8 Q 19.5 36.6 26.8 35.8"
            strokeWidth="1.9"
          />

          <path
            d="M 16.9 17.7 C 16.9 18.6 17.4 19.4 18.1 19.8"
            strokeWidth="1.35"
            opacity="0.65"
          />

          <path
            d="M 23.2 22.0 Q 25.5 23.9 27.8 22.0"
            strokeWidth="1.9"
          />

          <path
            d="M 31.8 23.7 C 32.3 24.2 32.6 24.7 32.7 25.3"
            strokeWidth="1.7"
          />

          <path
            d="M 35.3 28.6 C 33.4 28.8 32.0 29.6 31.2 30.7"
            strokeWidth="1.75"
          />

          <path
            d="M 15.4 39.1 Q 19.5 40.0 23.6 39.1"
            strokeWidth="1.25"
            opacity="0.48"
          />
        </g>
      </svg>
    </span>
  );
};
