
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
    <section id="process" className="py-32 bg-white/[0.01] reveal">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-24">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">O Método <br /><span className="serif italic font-normal text-blue-400">Engineered</span></h2>
          <p className="text-slate-400 text-xl leading-relaxed">
            Um processo transparente focado em eliminar riscos e garantir o ROI do seu investimento em tecnologia de ponta.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-12 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-transparent"></div>
          
          <div className="grid md:grid-cols-3 gap-16">
            {steps.map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="w-20 h-20 bg-blue-600/10 border border-blue-500/20 rounded-3xl flex items-center justify-center text-blue-400 mb-10 relative z-10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-[0_0_30px_rgba(37,99,235,0.05)] group-hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-5">{idx + 1}. {step.title}</h3>
                <p className="text-slate-400 text-lg leading-relaxed">
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
