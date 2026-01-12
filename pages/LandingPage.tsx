
import React from 'react';
import { Clipboard, UserRound, Briefcase, Stethoscope, ArrowRight } from 'lucide-react';
import { BedaLogo, StylizedB } from '../constants';

interface LandingPageProps {
  onLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const areas = [
    { 
      icon: <Clipboard className="text-white" size={32} />, 
      title: 'Direito dos Concurseiros e Servidores' 
    },
    { 
      icon: <UserRound className="text-white" size={32} />, 
      title: 'Direito da Saúde' 
    },
    { 
      icon: <Briefcase className="text-white" size={32} />, 
      title: 'Direito Trabalhista' 
    },
    { 
      icon: <Stethoscope className="text-white" size={32} />, 
      title: 'Direito Previdenciário' 
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-[#0A192F] py-6 px-12 sticky top-0 z-50 shadow-lg border-b border-white/5">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <BedaLogo className="h-10" />
          <div className="hidden md:flex gap-10">
            {['Página Inicial', 'Áreas de Atuação', 'Equipe', 'Notícias', 'Contato'].map((item, idx) => (
              <a 
                key={item} 
                href="#" 
                className={`text-sm font-medium transition-colors ${idx === 0 ? 'text-[#C4A661]' : 'text-white hover:text-[#C4A661]'}`}
              >
                {item}
              </a>
            ))}
          </div>
          <button 
            onClick={onLogin}
            className="bg-[#C4A661] text-white px-5 py-2 rounded-sm text-xs font-bold hover:bg-[#B59651] transition-all"
          >
            ACESSO RESTRITO
          </button>
        </nav>
      </header>

      {/* Services Grid Section */}
      <section className="pt-20 pb-10 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {areas.map((area, i) => (
            <div key={i} className="relative pt-12 group">
              {/* Gold Circle Icon */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-[#C4A661] rounded-full border-4 border-white flex items-center justify-center shadow-lg z-10 group-hover:scale-110 transition-transform">
                {area.icon}
              </div>
              {/* Card Body */}
              <div className="bg-[#1E3A5F] h-48 rounded-2xl flex items-center justify-center p-8 text-center shadow-2xl">
                <h3 className="text-white font-bold text-xl leading-tight">
                  {area.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Action Button */}
      <div className="flex justify-center pb-20">
        <button className="border-2 border-[#C4A661] text-[#C4A661] px-16 py-2 rounded-lg font-bold text-lg hover:bg-[#C4A661] hover:text-white transition-all">
          Saiba Mais
        </button>
      </div>

      {/* Main Banner Section */}
      <section className="bg-[#1E3A5F] relative overflow-hidden py-16">
        {/* Geometric Background Pattern Simulation */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="1"/>
                <path d="M 0 0 L 100 100" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center gap-12 relative z-10">
          {/* Large Stylized Logo */}
          <div className="flex-1 flex justify-center md:justify-start">
            <div className="w-64 h-64 md:w-80 md:h-80 border-4 border-[#C4A661] relative flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-[#C4A661] m-3 opacity-30"></div>
              <span className="text-[#C4A661] text-[180px] md:text-[220px] font-light select-none">B</span>
              {/* Linhas cruzadas como na imagem */}
              <div className="absolute w-full h-[2px] bg-[#C4A661] top-1/2 -translate-y-1/2 opacity-40"></div>
              <div className="absolute h-full w-[2px] bg-[#C4A661] left-1/2 -translate-x-1/2 opacity-40"></div>
            </div>
          </div>

          {/* Banner Text */}
          <div className="flex-[2] text-center md:text-left">
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-normal leading-tight max-w-4xl">
              Nosso escritório é composto por uma equipe especializada e multidisciplinar preparada para defender os interesses de nossos clientes
            </h2>
          </div>
        </div>
      </section>

      {/* Testimonials Header (Start of the next section shown in image) */}
      <section className="py-16 text-center">
        <h2 className="text-[#1E3A5F] text-4xl font-bold">
          O que nossos clientes dizem!
        </h2>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A192F] text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-8 text-center text-gray-500 text-sm">
          <BedaLogo className="h-12 mx-auto mb-8 opacity-80" />
          <p>© 2026 Beda Advocacia. Todos os direitos reservados. Desenvolvido por EasyDots.</p>
        </div>
      </footer>
    </div>
  );
};
