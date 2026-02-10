
import React from 'react';
import { Layers } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  scrolled: boolean;
}

export const Header: React.FC<HeaderProps> = ({ scrolled }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const whatsappUrl = "https://wa.me/5535998842525?text=Olá%20JP,%20vi%20seu%20portfolio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.";

  const handleNavClick = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-6 md:py-8'}`}>
      <div className={`container mx-auto px-4 sm:px-6 flex items-center justify-between transition-all duration-500 ${scrolled ? 'bg-black/60 backdrop-blur-xl border border-white/10 rounded-full max-w-5xl py-2 px-4 sm:px-8 shadow-2xl mx-4 sm:mx-auto' : ''}`}>
        <Link to="/" className="flex items-center gap-2 md:gap-3 group cursor-pointer">
          <div className="w-7 h-7 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center transition-transform group-hover:rotate-12 shrink-0">
            <Layers className="text-black w-4 h-4 md:w-5 md:h-5" />
          </div>
          <span className="text-white font-bold text-lg md:text-xl tracking-tight whitespace-nowrap">JP <span className="font-light opacity-50">ENGINE</span></span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-[12px] font-medium tracking-wide text-slate-400">
          <button onClick={() => handleNavClick('portfolio')} className="hover:text-white transition-colors uppercase tracking-widest font-black text-[9px]">Trabalhos</button>
          <button onClick={() => handleNavClick('features')} className="hover:text-white transition-colors uppercase tracking-widest font-black text-[9px]">Design</button>
          <button onClick={() => handleNavClick('process')} className="hover:text-white transition-colors uppercase tracking-widest font-black text-[9px]">Método</button>
          <button onClick={() => handleNavClick('contact')} className="hover:text-white transition-colors uppercase tracking-widest font-black text-[9px]">Contato</button>
        </nav>

        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold hover:bg-slate-200 transition-all active:scale-95 shadow-lg shrink-0"
        >
          Iniciar Projeto
        </a>
      </div>
    </header>
  );
};
