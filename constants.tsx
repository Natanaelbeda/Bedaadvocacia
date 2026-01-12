
import React from 'react';

export const COLORS = {
  NAVY: '#1E3A5F',
  GOLD: '#C4A661',
  PURPLE: '#8B5CF6',
  BLUE: '#3B82F6',
  WHITE: '#FFFFFF',
  SUCCESS: '#10B981',
  DANGER: '#EF4444',
  WARNING: '#F59E0B',
};

/**
 * Logo "B" estilizado - Réplica fiel da imagem anexa
 */
export const StylizedB = ({ className = "h-12", color = "#C4A661", withBackground = false }: { className?: string, color?: string, withBackground?: boolean }) => (
  <div className={`relative inline-block ${className} aspect-square`}>
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background geometric lines if requested */}
      {withBackground && (
        <g opacity="0.15">
          <path d="M0 20L100 80M20 0L80 100M0 50H100M50 0V100" stroke={color} strokeWidth="0.5" />
          <path d="M10 10L90 90M90 10L10 90" stroke={color} strokeWidth="0.5" />
        </g>
      )}
      
      {/* The Main Frame - Rounded top-right and bottom-left */}
      <path 
        d="M15 15H70C80 15 85 20 85 30V70C85 80 80 85 70 85H30C20 85 15 80 15 70V15Z" 
        stroke={color} 
        strokeWidth="3.5" 
        strokeLinejoin="round"
      />
      
      {/* The 'B' internal structure */}
      <path 
        d="M35 15V85" 
        stroke={color} 
        strokeWidth="3.5" 
      />
      <path 
        d="M35 50H75" 
        stroke={color} 
        strokeWidth="3.5" 
      />
      <path 
        d="M35 15C55 15 70 25 70 35C70 45 60 50 45 50" 
        stroke={color} 
        strokeWidth="3.5" 
        fill="none"
      />
      <path 
        d="M35 50C65 50 80 60 80 70C80 80 65 85 45 85" 
        stroke={color} 
        strokeWidth="3.5" 
        fill="none"
      />
    </svg>
  </div>
);

export const PontoCertoLogo = ({ className = "h-10" }: { className?: string }) => (
  <div className={`flex items-center gap-4 ${className}`}>
    <StylizedB className="h-full" />
    <div className="flex flex-col leading-tight">
      <div className="flex items-center gap-1">
        <span className="text-white font-bold text-xl tracking-tight">PONTO</span>
        <span className="text-[#C4A661] font-bold text-xl tracking-tight">CERTO</span>
      </div>
      <span className="text-[9px] text-gray-400 font-bold tracking-[0.3em] uppercase opacity-70">Controle de Jornada</span>
    </div>
  </div>
);

// Fallback for legacy components
export const BedaLogo = PontoCertoLogo;
