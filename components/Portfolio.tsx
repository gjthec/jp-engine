
import React, { useState } from 'react';
import { X, ArrowUpRight, Plus } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

export const Portfolio: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "Lumina Skincare",
      category: "E-commerce Premium",
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=1200",
      description: "Uma experiência de compra minimalista focada em luxo e simplicidade."
    },
    {
      id: 2,
      title: "Nova Bank App",
      category: "Interface Fintech",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200",
      description: "Simplificando finanças complexas através de uma UI limpa e intuitiva."
    },
    {
      id: 3,
      title: "Architex Portfolio",
      category: "Creative Site",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
      description: "Design arquitetônico transformado em uma galeria digital imersiva."
    }
  ];

  return (
    <section id="portfolio" className="py-32 container mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
        <div>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter">Trabalhos <br /> <span className="serif italic font-normal text-blue-400">Selecionados</span></h2>
          <p className="text-slate-400 max-w-md text-lg">Projetos onde a estética encontra a função para criar algo único.</p>
        </div>
        <button className="text-white font-bold flex items-center gap-3 border-b border-white/20 pb-2 hover:border-white transition-all">
          Ver todos os projetos <ArrowUpRight size={20} />
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div 
            key={project.id}
            onClick={() => setSelected(project)}
            className="group relative cursor-pointer overflow-hidden rounded-[32px] aspect-[4/5]"
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-8 left-8 right-8 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
              <span className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2 block">{project.category}</span>
              <h3 className="text-2xl font-bold text-white">{project.title}</h3>
            </div>
            <div className="absolute top-8 right-8 w-12 h-12 glass rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500">
              <Plus size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setSelected(null)}></div>
          <div className="relative glass w-full max-w-5xl rounded-[48px] overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-500">
            <button 
              onClick={() => setSelected(null)}
              className="absolute top-8 right-8 z-10 w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:bg-white/10"
            >
              <X size={24} />
            </button>
            <div className="w-full md:w-1/2 h-80 md:h-auto">
              <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center">
              <span className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-4 block">{selected.category}</span>
              <h3 className="text-4xl font-bold text-white mb-8">{selected.title}</h3>
              <p className="text-slate-400 text-xl leading-relaxed mb-12">{selected.description}</p>
              <button className="bg-white text-black py-4 px-8 rounded-full font-bold flex items-center justify-center gap-3 w-fit">
                Explorar Caso <ArrowUpRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
