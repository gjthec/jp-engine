
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
    <section id="features" className="py-32 container mx-auto px-6">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">O que fazemos <span className="serif italic font-normal text-blue-400">melhor</span></h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">Criamos a ponte entre o seu negócio e o seu cliente através de experiências digitais superiores.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div key={idx} className="glass p-12 rounded-[40px] hover-lift transition-all group">
            <div className="mb-8 w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{feature.title}</h3>
            <p className="text-slate-400 leading-relaxed font-medium">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
