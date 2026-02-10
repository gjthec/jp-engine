
import React from 'react';

export const TechStack: React.FC = () => {
  const techs = [
    { name: 'Node.js', icon: 'https://cdn.simpleicons.org/node.js/e2e8f0' },
    { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/e2e8f0' },
    { name: 'React', icon: 'https://cdn.simpleicons.org/react/e2e8f0' },
    { name: 'Google Cloud', icon: 'https://cdn.simpleicons.org/googlecloud/e2e8f0' },
    { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/e2e8f0' },
    { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/e2e8f0' },
    { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/e2e8f0' },
    { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/e2e8f0' },
    { name: 'Prisma', icon: 'https://cdn.simpleicons.org/prisma/e2e8f0' },
    { name: 'Kubernetes', icon: 'https://cdn.simpleicons.org/kubernetes/e2e8f0' },
  ];

  // Duplicamos o array para criar o efeito de scroll infinito perfeito
  const doubleTechs = [...techs, ...techs];

  return (
    <div className="py-12 border-y border-white/5 bg-white/[0.01] overflow-hidden">
      <div className="container mx-auto px-6">
        <p className="text-center text-slate-500 text-[9px] font-black uppercase tracking-[0.5em] mb-12">
          Stack Tecnológica de Nível Industrial
        </p>
      </div>
      
      <div className="relative flex overflow-hidden">
        <div className="flex animate-infinite-scroll whitespace-nowrap">
          {doubleTechs.map((tech, idx) => (
            <div 
              key={`${tech.name}-${idx}`} 
              className="flex flex-col items-center gap-4 px-12 md:px-20 grayscale transition-all duration-500 hover:grayscale-0 group"
            >
              <img 
                src={tech.icon} 
                alt={tech.name} 
                className="w-8 h-8 opacity-30 transition-all duration-300 transform group-hover:scale-110 group-hover:opacity-100" 
              />
              <span className="text-slate-500 font-bold text-[10px] tracking-[0.3em] uppercase transition-colors group-hover:text-blue-500">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
        
        {/* Camadas de gradiente para suavizar as bordas */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none"></div>
      </div>
    </div>
  );
};
