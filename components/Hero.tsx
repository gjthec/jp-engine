
import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden mesh-gradient">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-y-4 gap-x-6 mb-10">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-blue-300 text-[11px] font-bold uppercase tracking-widest">
              <Sparkles size={14} />
              <span>Engenharia Orientada ao Design</span>
            </div>
            
            <div className="flex items-center gap-4 text-slate-400 text-[11px] font-bold uppercase tracking-[0.15em] sm:border-l sm:border-white/10 sm:pl-6">
              <img 
                src="https://i.ibb.co/wGjN4sr/Generated-Image-February-08-2026-1-03-AM-Photoroom.png" 
                alt="UTFPR Logo" 
                className="h-12 w-auto object-contain transition-transform hover:scale-105 duration-300"
              />
              <span className="whitespace-nowrap tracking-widest">
                Bacharel em Ciência da Computação
              </span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-[1.05]">
            Transformamos <br />
            <span className="serif italic font-normal text-blue-400">Visão Digital</span> <br />
            em Realidade.
          </h1>

          <p className="text-slate-400 text-xl md:text-2xl mb-12 max-w-2xl leading-relaxed">
            Criamos interfaces que não apenas funcionam, mas encantam. Unimos a precisão técnica da <span className="text-white font-semibold">Ciência da Computação</span> com a alma do design premium.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button className="w-full sm:w-auto bg-blue-600 text-white px-10 py-5 rounded-full font-bold text-sm hover:bg-blue-500 transition-all flex items-center justify-center gap-3 group shadow-xl shadow-blue-600/20">
              Ver Portfolio
              <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto text-white/70 hover:text-white px-10 py-5 font-bold text-sm transition-all border-b border-white/10 hover:border-white">
              Nossa Trajetória
            </button>
          </div>
        </div>
      </div>

      {/* Abstract Floating Element */}
      <div className="absolute right-[-10%] top-[20%] w-[60%] h-[60%] opacity-20 pointer-events-none animate-float">
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-blue-600 to-violet-600 blur-[120px]"></div>
      </div>
    </section>
  );
};
