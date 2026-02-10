
import React from 'react';
import { ExternalLink } from 'lucide-react';

export const CaseStudies: React.FC = () => {
  const cases = [
    {
      client: "LogiTech Solutions",
      problem: "Processos manuais em planilhas causavam 15% de perda de estoque por mês.",
      solution: "Desenvolvimento de um WMS (Warehouse Management System) personalizado com leitura de QR Code em tempo real.",
      results: "Redução de 98% nas perdas em apenas 3 meses de uso.",
      image: "https://picsum.photos/seed/tech1/800/600"
    },
    {
      client: "FinFlow Invest",
      problem: "Plataforma antiga não aguentava picos de acesso e tinha brechas de segurança.",
      solution: "Recodificação total em Node.js e React, utilizando arquitetura de microserviços e Google Cloud Run.",
      results: "Capacidade de usuários simultâneos aumentada em 10x sem aumento no custo de infra.",
      image: "https://picsum.photos/seed/tech2/800/600"
    }
  ];

  return (
    <section id="cases" className="py-24 container mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Estudos de Caso</h2>
          <p className="text-slate-400 text-lg">
            Não entregamos apenas código. Entregamos soluções que resolvem problemas reais de negócio.
          </p>
        </div>
        <a 
          href="#portfolio"
          className="text-blue-400 font-bold hover:text-blue-300 transition-colors flex items-center gap-2"
        >
          Ver todos os projetos <ExternalLink size={18} />
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {cases.map((item, idx) => (
          <div key={idx} className="group cursor-default">
            <div className="relative overflow-hidden rounded-2xl mb-8 aspect-video">
              <img 
                src={item.image} 
                alt={item.client} 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-60"></div>
              <div className="absolute bottom-6 left-6">
                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Impacto: {item.results}
                </span>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4">{item.client}</h3>
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-1">O Problema</span>
                <p className="text-slate-400">{item.problem}</p>
              </div>
              <div>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-widest block mb-1">A Solução</span>
                <p className="text-slate-400">{item.solution}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};