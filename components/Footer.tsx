
import React from 'react';
import { Mail, Instagram, Linkedin, ArrowRight, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const whatsappUrl = "https://wa.me/5535998842525?text=Olá%20JP,%20vi%20seu%20portfolio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.";
  
  return (
    <footer id="contact" className="py-32 container mx-auto px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center mb-32">
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-12 tracking-tighter">
          Vamos criar algo <br />
          <span className="serif italic font-normal text-blue-400">memorável?</span>
        </h2>
        
        <div className="flex flex-col items-center gap-8">
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-6 text-2xl md:text-4xl font-bold text-white hover:text-blue-400 transition-colors"
          >
            Falar no WhatsApp
            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-green-500 group-hover:border-green-500 group-hover:text-white transition-all">
              <MessageCircle size={32} />
            </div>
          </a>
          
          <a 
            href="mailto:bugsescripts@hotmail.com"
            className="text-slate-500 hover:text-white transition-colors text-lg font-medium border-b border-transparent hover:border-white/20 pb-1"
          >
            bugsescripts@hotmail.com
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
            href="https://www.linkedin.com/in/joao-pedro-9a1328247/" 
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
