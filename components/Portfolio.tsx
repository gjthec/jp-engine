
import React, { useState } from 'react';
import { Plus, ChevronDown, ChevronUp, Star, Loader2 } from 'lucide-react';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  url: string;
  description: string;
  rating: number;
  reviews?: Review[];
}

interface PortfolioProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  isFirebaseOn: boolean;
}

export const Portfolio: React.FC<PortfolioProps> = ({ projects, onSelectProject, isFirebaseOn }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section id="portfolio" className="py-32 container mx-auto px-6 reveal">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
        <div className="reveal-child">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 px-3 py-1 rounded-full border border-blue-500/20 mb-6">
            <div className={`w-1.5 h-1.5 rounded-full ${isFirebaseOn ? 'bg-green-500 animate-pulse' : 'bg-blue-500'}`}></div>
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
              {isFirebaseOn ? 'Cloud Sync Active' : 'Hybrid Engine Active'}
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter leading-none">
            Trabalhos <br /> <span className="serif italic font-normal text-blue-400">Selecionados</span>
          </h2>
          <p className="text-slate-400 max-w-md text-lg leading-relaxed">
            Interaja com as soluções em tempo real. Cada "Engine" é um ecossistema verificado e ativo.
          </p>
        </div>
        
        {projects.length > 3 && (
          <button 
            onClick={() => setShowAll(!showAll)}
            className="group text-white font-bold flex items-center gap-3 border-b border-white/20 pb-2 hover:border-blue-400 hover:text-blue-400 transition-all w-fit"
          >
            {showAll ? 'Ocultar Projetos' : 'Explorar Galeria'} 
            {showAll ? <ChevronUp size={20} /> : <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform duration-500" />}
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative min-h-[400px]">
        {displayedProjects.map((project, index) => (
          <div 
            key={project.id}
            onClick={() => onSelectProject(project)}
            className={`group relative cursor-pointer overflow-hidden rounded-[32px] aspect-[4/5] animate-in fade-in slide-in-from-bottom-8 duration-[1000ms] fill-mode-both ease-[cubic-bezier(0.2,0,0,1)]`}
            style={{ animationDelay: `${(index % 3) * 100}ms` }}
          >
            <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1200ms]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="absolute top-8 left-8">
              <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 group-hover:border-blue-500/30 transition-colors">
                <Star size={10} className="text-yellow-500 fill-yellow-500" />
                <span className="text-white text-[10px] font-black tracking-tighter">{project.rating.toFixed(1)}</span>
              </div>
            </div>

            <div className="absolute bottom-10 left-10 right-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
              <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">{project.category}</span>
              <h3 className="text-3xl font-bold text-white tracking-tight leading-none mb-4">{project.title}</h3>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">Explorar Engine <Plus size={12} /></span>
              </div>
            </div>
            
            <div className="absolute top-10 right-10 w-14 h-14 glass rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100 shadow-2xl">
              <Plus size={28} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
