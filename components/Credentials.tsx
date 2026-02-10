
import React from 'react';
import { Award, Briefcase, MapPin } from 'lucide-react';

export const Credentials: React.FC = () => {
  return (
    <section className="py-32 container mx-auto px-6 border-y border-white/5 bg-white/[0.01]">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight tracking-tighter">
            Fundamentos Sólidos, <br />
            <span className="serif italic font-normal text-blue-400">Resultados Reais.</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            Minha abordagem une o rigor acadêmico da engenharia com a sensibilidade estética necessária para o mercado de luxo e alta conversão. Não apenas desenho telas; projeto ecossistemas que escalam.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="glass p-8 rounded-3xl group hover:bg-white/5 transition-colors">
              <div className="mb-6 h-20 flex items-center">
                <img 
                  src="https://i.ibb.co/wGjN4sr/Generated-Image-February-08-2026-1-03-AM-Photoroom.png" 
                  alt="UTFPR" 
                  className="h-20 object-contain transition-transform group-hover:scale-105"
                />
              </div>
              <h4 className="text-white font-bold text-lg mb-1">Bacharelado</h4>
              <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-3">Ciência da Computação</p>
              <p className="text-slate-500 text-sm">Formado pela <span className="text-slate-300">UTFPR</span>, com foco em algoritmos, arquitetura e engenharia de software.</p>
            </div>
            
            <div className="glass p-8 rounded-3xl group hover:bg-white/5 transition-colors flex flex-col justify-center">
              <div className="text-blue-400 mb-6"><Briefcase size={40} /></div>
              <h4 className="text-white font-bold text-lg">Senioridade</h4>
              <p className="text-slate-500 text-sm">Mais de <span className="text-slate-300">8 anos</span> atuando na linha de frente do desenvolvimento web para o mercado global.</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="glass p-10 rounded-[48px] relative z-10">
            <div className="space-y-12">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 shrink-0">
                  <Award size={24} />
                </div>
                <div>
                  <h5 className="text-white font-bold mb-2">Engenharia de Interface</h5>
                  <p className="text-slate-500 text-sm leading-relaxed">Arquitetura de front-end escalável utilizando os padrões mais modernos da indústria global, com base sólida em fundamentos de computação.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h5 className="text-white font-bold mb-2">Visão de Mercado</h5>
                  <p className="text-slate-500 text-sm leading-relaxed">Experiência sólida atendendo clientes nacionais e internacionais, de startups a grandes corporações, unindo técnica e estratégia.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-12 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-white font-black text-3xl block">150+</span>
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Sprints Entregues</span>
              </div>
              <div className="text-right">
                <span className="text-white font-black text-3xl block">98%</span>
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Satisfação</span>
              </div>
            </div>
          </div>
          
          {/* Decorative element */}
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full"></div>
        </div>
      </div>
    </section>
  );
};
