import React from 'react';
import { ArrowDownRight } from 'lucide-react';
import portrait from '@/assets/foto2.jpeg';

export const AboutMe: React.FC = () => (
  <section id="about" className="scroll-mt-28 border-y border-white/5 bg-white/[0.015] py-24 md:py-32">
    <div className="container mx-auto grid items-center gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
      <div className="relative mx-auto w-full max-w-sm">
        <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] border border-blue-400/20" />
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#090b12]">
          <img
            src={portrait}
            alt="Retrato de João Pedro Martins da Silva"
            className="aspect-[4/5] w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090b12]/60 via-transparent to-transparent" />
          <span className="absolute bottom-6 left-6 text-xs font-semibold tracking-wide text-white/60">JP<span className="text-blue-300">.</span></span>
        </div>
      </div>

      <div>
        <span className="mb-6 inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.35em] text-blue-400">
          <span className="h-px w-8 bg-blue-400" /> Sobre mim
        </span>
        <h2 className="mb-8 max-w-2xl text-4xl font-bold leading-tight tracking-tighter text-white md:text-6xl">
          Uma paixão por programação que começou cedo.
        </h2>
        <p className="mb-6 text-xl font-medium leading-relaxed text-slate-200 md:text-2xl">
          Meu nome é João Pedro Martins da Silva. Sou bacharel em Ciência da Computação pela UTFPR e fundador da JP Engine.
        </p>
        <p className="mb-5 max-w-2xl text-base leading-8 text-slate-400">
          Desde pequeno, sou apaixonado por programação. A curiosidade de entender como a tecnologia funciona me levou a explorar o código, experimentar ideias e criar. Essa paixão me acompanhou até a graduação em Ciência da Computação e hoje guia meu trabalho.
        </p>
        <p className="mb-8 max-w-2xl text-base leading-8 text-slate-400">
          Na JP Engine, uno engenharia de software e design para transformar ideias em experiências digitais cuidadosas, rápidas e feitas para pessoas e negócios.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-300">Ciência da Computação · UTFPR</span>
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-300">Fundador · JP Engine</span>
        </div>
        <a href="https://wa.me/5547997924851" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 transition-colors hover:text-white">
          Vamos conversar <ArrowDownRight size={15} />
        </a>
      </div>
    </div>
  </section>
);
