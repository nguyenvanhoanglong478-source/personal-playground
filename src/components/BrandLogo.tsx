import React, { useId } from 'react';

interface BrandLogoProps {
  size?: number;
  className?: string;
  showAura?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 40,
  className = '',
  showAura = true,
}) => {
  const rawId = useId();
  const safeId = rawId.replace(/:/g, '');
  const gradId = `brand-star-grad-${safeId}`;
  const auraGlowId = `brand-star-aura-${safeId}`;

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
              'conic-gradient(from 45deg, #4285F4, #9B72CB, #D96570, #FBBC04, #34A853, #4285F4)',
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
        aria-label="Long Hoàng Logo"
        className="relative z-10 overflow-visible"
      >
        <defs>
          <linearGradient
            id={gradId}
            x1="6"
            y1="5"
            x2="43"
            y2="41"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#4285F4" />
            <stop offset="26%" stopColor="#9B72CB" />
            <stop offset="52%" stopColor="#D96570" />
            <stop offset="78%" stopColor="#FBBC04" />
            <stop offset="100%" stopColor="#34A853" />
          </linearGradient>

          <radialGradient id={auraGlowId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4285F4" stopOpacity="0.22" />
            <stop offset="60%" stopColor="#9B72CB" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#34A853" stopOpacity="0" />
          </radialGradient>
        </defs>

        {showAura && (
          <circle
            cx="24"
            cy="24"
            r="21"
            fill={`url(#${auraGlowId})`}
            className="opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 motion-reduce:transition-none"
          />
        )}

        <g
          style={{ transformOrigin: '22px 25px', transformBox: 'view-box' }}
          className={
            showAura
              ? 'transition-transform duration-500 ease-out group-hover:rotate-[12deg] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:transform-none'
              : undefined
          }
        >
          <path
            d="M 22 9 C 23.28 18.28 28.72 23.72 38 25 C 28.72 26.28 23.28 31.72 22 41 C 20.72 31.72 15.28 26.28 6 25 C 15.28 23.72 20.72 18.28 22 9 Z"
            fill={`url(#${gradId})`}
          />
        </g>

        <g
          style={{ transformOrigin: '37.5px 10.5px', transformBox: 'view-box' }}
          className={
            showAura
              ? 'transition-transform duration-500 ease-out group-hover:-rotate-90 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:transform-none'
              : undefined
          }
        >
          <path
            d="M 37.5 5 C 37.94 8.19 39.81 10.06 43 10.5 C 39.81 10.94 37.94 12.81 37.5 16 C 37.06 12.81 35.19 10.94 32 10.5 C 35.19 10.06 37.06 8.19 37.5 5 Z"
            fill={`url(#${gradId})`}
          />
        </g>
      </svg>
    </span>
  );
};
