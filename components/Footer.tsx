
import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const Footer: React.FC = () => {
  const whatsappUrl = "https://wa.me/5547997924851?text=Olá%20JP,%20vi%20seu%20portfolio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.";
  
  return (
    <footer id="contact" className="py-32 container mx-auto px-6 border-t border-white/5">
      <div className="relative mx-auto mb-28 max-w-4xl overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-b from-white/[0.035] to-transparent px-6 py-16 text-center md:mb-32 md:py-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-[32rem] -translate-x-1/2 rounded-full bg-blue-500/[0.08] blur-[100px]" />
        <div className="relative">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" /> Novos projetos
          </div>
          <h2 className="mb-10 text-5xl font-bold tracking-tighter text-white md:text-7xl">
            Vamos criar algo<br />
            <span className="serif italic font-normal text-blue-400">memorável?</span>
          </h2>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar pelo WhatsApp no número +55 47 99792-4851"
            title="Falar no WhatsApp"
            className="group inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black"
          >
            <WhatsAppIcon className="h-10 w-10 transition-transform group-hover:scale-105" />
          </a>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-12 pt-12 border-t border-white/5 text-slate-500 text-sm font-medium">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
             <div className="w-2 h-2 bg-black rounded-full"></div>
          </div>
          <span className="text-white font-bold tracking-tight">JP <span className="opacity-40 font-light">ENGINE</span></span>
          <span className="opacity-50 ml-4 font-normal">© 2024 Design Studio</span>
        </div>

        <div className="flex gap-10">
          <a 
            href="https://www.instagram.com/jp_engine" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 hover:text-white transition-colors group"
          >
            <Instagram size={16} className="group-hover:text-pink-500 transition-colors" />
            Instagram
          </a>
          <a 
            href="https://www.linkedin.com/in/jo%C3%A3o-pedro-9a1328247/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 hover:text-white transition-colors group"
          >
            <Linkedin size={16} className="group-hover:text-blue-500 transition-colors" />
            LinkedIn
          </a>
        </div>

        <div className="text-[10px] uppercase tracking-[0.3em] opacity-30 font-black">
          Engine Component V4.2
        </div>
      </div>
    </footer>
  );
};
