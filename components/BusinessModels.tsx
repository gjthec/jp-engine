
import React from 'react';
import { FileText, Handshake } from 'lucide-react';

export const BusinessModels: React.FC = () => {
  return (
    <section id="business" className="py-24 bg-white/[0.02] border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Formatos de Trabalho</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Flexibilidade para atender desde necessidades pontuais até grandes parcerias estratégicas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white/[0.03] border border-white/10 p-10 rounded-3xl hover:bg-white/[0.05] transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl -mr-10 -mt-10 group-hover:bg-blue-600/20 transition-all"></div>
            
            <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 mb-8">
              <FileText />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4">Projeto Fechado</h3>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Ideal para quem tem escopo definido e precisa de uma entrega de alta qualidade com prazo e investimento fixos.
            </p>
            
            <ul className="space-y-3 mb-10">
              <li className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                Escopo e Prazos bem definidos
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                Investimento sob medida
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                Documentação completa
              </li>
            </ul>

            <button className="w-full py-4 border border-blue-500/30 text-blue-400 font-bold rounded-xl hover:bg-blue-500 hover:text-white transition-all">
              Saber mais
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0A0A0B] border border-purple-500/20 p-10 rounded-3xl hover:border-purple-500/40 transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 blur-3xl -mr-10 -mt-10"></div>
            
            <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400 mb-8">
              <Handshake />
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-2xl font-bold text-white">Modelo Equity</h3>
              <span className="bg-purple-600/20 text-purple-400 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-500/30 uppercase tracking-tighter">
                Exclusivo
              </span>
            </div>
            
            <p className="text-slate-400 mb-8 leading-relaxed">
              Para projetos de alta escalabilidade onde atuamos como o braço tecnológico (CTO as a Service) em troca de participação.
            </p>
            
            <ul className="space-y-3 mb-10">
              <li className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                Parceria Estratégica
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                Evolução contínua do produto
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                Seleção via Pitch
              </li>
            </ul>

            <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
              Aplicar para Parceria
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
