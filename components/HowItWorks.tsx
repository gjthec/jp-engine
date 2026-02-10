
import React from 'react';
import { Search, Code2, Rocket } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: 'Consultoria Estratégica',
      desc: 'Entendemos seu modelo de negócio, dores e objetivos. Nada de código sem propósito.',
      icon: <Search className="w-6 h-6" />
    },
    {
      title: 'Desenvolvimento Ágil',
      desc: 'Sprints semanais com entregas contínuas. Você acompanha cada etapa da evolução do sistema.',
      icon: <Code2 className="w-6 h-6" />
    },
    {
      title: 'Entrega e Suporte',
      desc: 'Publicação em ambiente escalável com monitoramento 24/7 e suporte dedicado.',
      icon: <Rocket className="w-6 h-6" />
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white/[0.01]">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Como Trabalhamos</h2>
          <p className="text-slate-400 text-lg">
            Um processo transparente focado em eliminar riscos e garantir o ROI do seu investimento em tecnologia.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-transparent"></div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="w-16 h-16 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center text-blue-400 mb-8 relative z-10">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{idx + 1}. {step.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
