
import React from 'react';
import { Eye, Palette, Zap } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      title: 'Design de Impacto',
      description: 'Interfaces que capturam a atenção nos primeiros segundos. Focamos em estética que gera autoridade imediata.',
      icon: <Eye className="w-6 h-6" />,
    },
    {
      title: 'Experiência Fluida',
      description: 'Navegação intuitiva onde cada clique é pensado. Reduzimos o atrito e maximizamos a satisfação do usuário.',
      icon: <Palette className="w-6 h-6" />,
    },
    {
      title: 'Performance Invisível',
      description: 'Sites que carregam instantaneamente. A tecnologia trabalha nos bastidores para que o design brilhe.',
      icon: <Zap className="w-6 h-6" />,
    }
  ];

  return (
    <section id="features" className="py-24 md:py-40 container mx-auto px-6 reveal">
      <div className="text-center mb-16 md:mb-32">
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-6 md:mb-8 tracking-tighter">
          O que fazemos <span className="serif italic font-normal text-blue-400">melhor</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
          Elevamos a percepção da sua marca através de experiências digitais de classe mundial.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {features.map((feature, idx) => (
          <div key={idx} className="glass p-8 md:p-16 rounded-[32px] md:rounded-[56px] hover-lift transition-all group relative overflow-hidden">
            <div className="mb-8 w-14 h-14 md:w-16 md:h-16 bg-white/5 rounded-2xl flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-xl">
              {feature.icon}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 tracking-tight">{feature.title}</h3>
            <p className="text-slate-400 leading-relaxed text-base md:text-lg font-medium opacity-80">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
