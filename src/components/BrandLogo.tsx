import React from 'react';

interface BrandLogoProps {
  size?: number;
  className?: string;
  showAura?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 36,
  className = '',
  showAura = true,
}) => {
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
              'radial-gradient(circle, rgba(249, 115, 22, 0.24) 0%, rgba(208, 149, 96, 0.16) 52%, transparent 76%)',
          }}
          className="pointer-events-none absolute -inset-1 rounded-full opacity-0 blur-sm transition-all duration-300 ease-out group-hover:scale-110 group-hover:opacity-100 motion-reduce:transition-none motion-reduce:group-hover:transform-none motion-reduce:group-hover:opacity-0"
        />
      )}

      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        role="img"
        aria-label="Long Hoàng — Capybara Pixel Logo"
        className={`relative z-10 block select-none overflow-visible ${
          showAura
            ? 'transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:transform-none'
            : ''
        }`}
      >
        <rect x="7" y="0" width="1" height="1" fill="#15803D" />
        <rect x="8" y="0" width="2" height="1" fill="#22C55E" />

        <rect x="6" y="1" width="2" height="1" fill="#FDBA74" />
        <rect x="8" y="1" width="2" height="1" fill="#F97316" />
        <rect x="6" y="2" width="1" height="1" fill="#FDBA74" />
        <rect x="7" y="2" width="3" height="1" fill="#F97316" />

        <rect x="2" y="2" width="2" height="1" fill="#3B2417" />
        <rect x="12" y="2" width="2" height="1" fill="#3B2417" />

        <rect x="2" y="3" width="1" height="1" fill="#3B2417" />
        <rect x="3" y="3" width="1" height="1" fill="#734928" />
        <rect x="4" y="3" width="2" height="1" fill="#3B2417" />
        <rect x="6" y="3" width="4" height="1" fill="#9C6639" />
        <rect x="10" y="3" width="2" height="1" fill="#3B2417" />
        <rect x="12" y="3" width="1" height="1" fill="#734928" />
        <rect x="13" y="3" width="1" height="1" fill="#3B2417" />

        <rect x="2" y="4" width="1" height="1" fill="#3B2417" />
        <rect x="3" y="4" width="1" height="1" fill="#9C6639" />
        <rect x="4" y="4" width="8" height="1" fill="#D09560" />
        <rect x="12" y="4" width="1" height="1" fill="#9C6639" />
        <rect x="13" y="4" width="1" height="1" fill="#3B2417" />

        <rect x="1" y="5" width="1" height="2" fill="#3B2417" />
        <rect x="2" y="5" width="2" height="1" fill="#B87B48" />
        <rect x="4" y="5" width="8" height="1" fill="#D09560" />
        <rect x="12" y="5" width="2" height="1" fill="#B87B48" />
        <rect x="14" y="5" width="1" height="2" fill="#3B2417" />

        <rect x="2" y="6" width="12" height="4" fill="#B87B48" />
        <rect x="1" y="7" width="1" height="3" fill="#2C1B12" />
        <rect x="14" y="7" width="1" height="3" fill="#2C1B12" />

        <rect x="2" y="9" width="1" height="1" fill="#9C6639" />
        <rect x="5" y="9" width="1" height="1" fill="#9C6639" />
        <rect x="10" y="9" width="1" height="1" fill="#9C6639" />
        <rect x="13" y="9" width="1" height="1" fill="#9C6639" />

        <rect x="6" y="6" width="4" height="5" fill="#734928" />

        <rect x="3" y="6" width="1" height="2" fill="#24150E" />
        <rect x="12" y="6" width="1" height="2" fill="#24150E" />

        <rect x="2" y="8" width="2" height="1" fill="#E58B7B" />
        <rect x="12" y="8" width="2" height="1" fill="#E58B7B" />

        <rect x="6" y="7" width="4" height="1" fill="#24150E" />
        <rect x="7" y="8" width="2" height="2" fill="#24150E" />

        <rect x="2" y="10" width="1" height="3" fill="#2C1B12" />
        <rect x="3" y="10" width="3" height="1" fill="#9C6639" />
        <rect x="10" y="10" width="3" height="1" fill="#9C6639" />
        <rect x="13" y="10" width="1" height="3" fill="#2C1B12" />

        <rect x="3" y="11" width="2" height="1" fill="#B87B48" />
        <rect x="5" y="11" width="1" height="1" fill="#9C6639" />
        <rect x="6" y="11" width="4" height="1" fill="#D09560" />
        <rect x="10" y="11" width="1" height="1" fill="#9C6639" />
        <rect x="11" y="11" width="2" height="1" fill="#B87B48" />

        <rect x="3" y="12" width="2" height="1" fill="#9C6639" />
        <rect x="5" y="12" width="1" height="1" fill="#3B2417" />
        <rect x="6" y="12" width="4" height="1" fill="#B87B48" />
        <rect x="7" y="12" width="2" height="1" fill="#D09560" />
        <rect x="10" y="12" width="1" height="1" fill="#3B2417" />
        <rect x="11" y="12" width="2" height="1" fill="#9C6639" />

        <rect x="3" y="13" width="1" height="1" fill="#2C1B12" />
        <rect x="4" y="13" width="2" height="1" fill="#734928" />
        <rect x="6" y="13" width="4" height="1" fill="#9C6639" />
        <rect x="10" y="13" width="2" height="1" fill="#734928" />
        <rect x="12" y="13" width="1" height="1" fill="#2C1B12" />

        <rect x="4" y="14" width="8" height="1" fill="#2C1B12" />
      </svg>
    </span>
  );
};
