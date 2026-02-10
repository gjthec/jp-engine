
import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden mesh-gradient">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-blue-300 text-[9px] md:text-[11px] font-bold uppercase tracking-widest w-fit">
              <Sparkles size={12} />
              <span>Engenharia Orientada ao Design</span>
            </div>
            
            <div className="flex items-center gap-3 text-slate-400 text-[9px] md:text-[11px] font-bold uppercase tracking-widest sm:border-l sm:border-white/10 sm:pl-6">
              <span className="whitespace-nowrap">Bacharel em Ciência da Computação</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-6 md:mb-8 tracking-tighter leading-[1.1]">
            Transformamos <br />
            <span className="serif italic font-normal text-blue-400">Visão Digital</span> <br className="hidden sm:block" />
            em Realidade.
          </h1>

          <p className="text-slate-400 text-lg md:text-2xl mb-10 md:mb-12 max-w-2xl leading-relaxed">
            Criamos interfaces que não apenas funcionam, mas encantam. Unimos a precisão técnica da <span className="text-white font-semibold">Ciência da Computação</span> com a alma do design premium.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
            <a 
              href="#portfolio"
              className="w-full sm:w-auto bg-blue-600 text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-sm hover:bg-blue-500 transition-all flex items-center justify-center gap-3 group shadow-xl"
            >
              Ver Portfolio
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <a 
              href="#credentials"
              className="w-full sm:w-auto text-white/70 hover:text-white px-8 md:px-10 py-4 md:py-5 font-bold text-sm transition-all border-b border-white/10 hover:border-white text-center"
            >
              Nossa Trajetória
            </a>
          </div>
        </div>
      </div>

      <div className="absolute right-[-20%] md:right-[-10%] top-[30%] w-[80%] md:w-[60%] h-[60%] opacity-20 pointer-events-none">
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-blue-600 to-violet-600 blur-[120px]"></div>
      </div>
    </section>
  );
};
