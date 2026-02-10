
import React from 'react';
import { Layers } from 'lucide-react';

interface HeaderProps {
  scrolled: boolean;
}

export const Header: React.FC<HeaderProps> = ({ scrolled }) => {
  const whatsappUrl = "https://wa.me/5535998842525?text=Olá%20JP,%20vi%20seu%20portfolio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className={`container mx-auto px-6 flex items-center justify-between transition-all duration-500 ${scrolled ? 'bg-black/40 backdrop-blur-xl border border-white/10 rounded-full max-w-4xl py-3 px-8 shadow-2xl' : ''}`}>
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center transition-transform group-hover:rotate-12">
            <Layers className="text-black w-5 h-5" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">JP <span className="font-light opacity-50">ENGINE</span></span>
        </div>

        <nav className="hidden md:flex items-center gap-10 text-[13px] font-medium tracking-wide text-slate-400">
          <a href="#portfolio" className="hover:text-white transition-colors">Trabalhos</a>
          <a href="#features" className="hover:text-white transition-colors">Design</a>
          <a href="#process" className="hover:text-white transition-colors">Método</a>
          <a href="#contact" className="hover:text-white transition-colors">Contato</a>
        </nav>

        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black px-6 py-2.5 rounded-full text-xs font-bold hover:bg-slate-200 transition-all active:scale-95 shadow-lg shadow-white/5"
        >
          Iniciar Projeto
        </a>
      </div>
    </header>
  );
};
