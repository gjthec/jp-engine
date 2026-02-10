
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TechStack } from './components/TechStack';
import { Features } from './components/Features';
import { Credentials } from './components/Credentials';
import { Portfolio } from './components/Portfolio';
import { HowItWorks } from './components/HowItWorks';
import { CaseStudies } from './components/CaseStudies';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { GeminiAIAssistant } from './components/GeminiAIAssistant';
import { AdminPanel } from './components/AdminPanel';
import { db, isFirebaseEnabled } from './lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { 
  X, Globe, Loader2, Star, MessageSquare, Info, ShieldCheck, Activity
} from 'lucide-react';

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

const Home: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const [scrolled, setScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [showSpecs, setShowSpecs] = useState(true);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      setIframeLoading(true);
      setShowSpecs(true);
    }
  }, [selectedProject]);

  return (
    <div className="min-h-screen bg-[#030303]">
      <Header scrolled={scrolled} />
      <main>
        <Hero />
        <TechStack />
        <Features />
        <Credentials />
        <Portfolio projects={projects} onSelectProject={setSelectedProject} isFirebaseOn={isFirebaseEnabled} />
        <HowItWorks />
        <CaseStudies />
        <FAQ />
      </main>
      <Footer />
      <GeminiAIAssistant />

      {selectedProject && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 md:p-4">
          <div className="fixed inset-0 bg-black/95 cursor-pointer backdrop-blur-xl" onClick={() => setSelectedProject(null)}></div>
          
          <div className="relative glass rounded-[24px] md:rounded-[40px] overflow-hidden flex flex-col w-full max-w-[1500px] h-[95vh] md:h-[90vh] bg-[#080808] border border-white/10 shadow-2xl animate-in zoom-in-95 duration-500">
            {/* Modal Header */}
            <div className="bg-[#121212] border-b border-white/10 p-4 flex items-center justify-between shrink-0">
               <div className="flex items-center gap-3">
                  <div className="hidden md:flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40"></div>
                  </div>
                  <div className="bg-black/40 rounded-full px-4 py-1.5 border border-white/5 flex items-center gap-2">
                    <Globe size={12} className="text-blue-500" />
                    <span className="text-[10px] md:text-xs text-slate-400 font-mono tracking-wider truncate max-w-[150px] md:max-w-none">
                      {selectedProject.url.replace('https://', '')}
                    </span>
                  </div>
               </div>

               <div className="flex items-center gap-2">
                 <button 
                   onClick={() => setShowSpecs(!showSpecs)}
                   className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${showSpecs ? 'bg-blue-600 text-white border-blue-500' : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'}`}
                 >
                   {showSpecs ? 'Ver Preview' : 'Ver Specs'}
                 </button>
                 <button onClick={() => setSelectedProject(null)} className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white transition-all">
                   <X size={20} />
                 </button>
               </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Iframe Preview Side */}
                <div className={`relative flex-1 bg-[#050505] overflow-hidden transition-all duration-700 ${showSpecs ? 'hidden lg:block' : 'block'}`}>
                    {iframeLoading && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#080808] z-20">
                        <Loader2 className="text-blue-500 animate-spin mb-4" size={40} />
                        <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em]">Inicializando Engine...</span>
                      </div>
                    )}
                    <iframe 
                      src={selectedProject.url} 
                      className={`w-full h-full border-none transition-opacity duration-1000 ${iframeLoading ? 'opacity-0' : 'opacity-100'}`} 
                      onLoad={() => setIframeLoading(false)} 
                      title={selectedProject.title} 
                    />
                </div>

                {/* Specs & Reviews Side */}
                <div className={`w-full lg:w-[450px] bg-[#0A0A0B] border-l border-white/10 flex flex-col overflow-y-auto custom-scrollbar transition-all duration-500 ${showSpecs ? 'block' : 'hidden lg:block'}`}>
                  {/* Project Info */}
                  <div className="p-8 border-b border-white/5">
                    <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">{selectedProject.category}</span>
                    <h2 className="text-3xl font-bold text-white mb-4 tracking-tighter">{selectedProject.title}</h2>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-1.5 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                        <Star size={12} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-yellow-500 text-[11px] font-black">{selectedProject.rating.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                        <ShieldCheck size={12} className="text-green-500" />
                        <span className="text-green-500 text-[11px] font-black uppercase tracking-widest">Verificado</span>
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">
                      {selectedProject.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                        <Activity size={16} className="text-blue-500 mb-2" />
                        <span className="text-white text-xs font-bold block mb-1">Performance</span>
                        <span className="text-slate-500 text-[10px] uppercase font-black">Score: 99/100</span>
                      </div>
                      <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                        <Info size={16} className="text-purple-500 mb-2" />
                        <span className="text-white text-xs font-bold block mb-1">Arquitetura</span>
                        <span className="text-slate-500 text-[10px] uppercase font-black">Clean Code V2</span>
                      </div>
                    </div>
                  </div>

                  {/* Reviews Section */}
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-white font-bold flex items-center gap-2">
                        <MessageSquare size={18} className="text-blue-500" /> Avaliações do Cliente
                      </h3>
                      <span className="text-slate-600 text-[10px] font-black uppercase">Recent Feed</span>
                    </div>

                    <div className="space-y-6">
                      {selectedProject.reviews && selectedProject.reviews.length > 0 ? (
                        selectedProject.reviews.map((review) => (
                          <div key={review.id} className="bg-white/[0.01] border border-white/5 p-6 rounded-[24px] hover:bg-white/[0.03] transition-all">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h4 className="text-white font-bold text-sm">{review.userName}</h4>
                                <span className="text-[9px] text-slate-500 uppercase tracking-widest">{review.date}</span>
                              </div>
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} size={8} className={i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-slate-700"} />
                                ))}
                              </div>
                            </div>
                            <p className="text-slate-400 text-xs italic leading-relaxed">
                              "{review.comment}"
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="py-12 text-center border border-dashed border-white/5 rounded-[32px]">
                          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">Nenhum depoimento público</p>
                        </div>
                      )}
                    </div>
                    
                    <a 
                      href="https://wa.me/5535998842525" 
                      target="_blank" 
                      className="mt-12 w-full bg-white text-black py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center hover:bg-slate-200 transition-all"
                    >
                      Solicitar Engine Similar
                    </a>
                  </div>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const initialProjects: Project[] = [
    { 
      id: '1', 
      title: "Lumina Skincare", 
      category: "E-commerce Premium", 
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=1200", 
      url: "https://demo.vercel.store", 
      description: "Uma experiência de compra ultra-minimalista desenvolvida com foco no mercado de luxo, utilizando Next.js para renderização instantânea.", 
      rating: 4.9,
      reviews: [
        { id: 'r1', userName: "Clarissa Mendes", rating: 5, comment: "O design elevou o ticket médio da nossa loja em 40%. Impecável.", date: "12 Mar 2024" },
        { id: 'r2', userName: "Roberto Dias", rating: 4, comment: "Velocidade impressionante em dispositivos móveis.", date: "05 Fev 2024" }
      ]
    },
    { 
      id: '2', 
      title: "Nova Bank App", 
      category: "Interface Fintech", 
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200", 
      url: "https://stripe.com/br", 
      description: "Arquitetura de interface para sistemas financeiros complexos, focada em segurança, clareza visual e gestão de dados em larga escala.", 
      rating: 5.0,
      reviews: [
        { id: 'r3', userName: "Tech Lead @FinHub", rating: 5, comment: "O JP entendeu complexidades que outros designers ignoraram.", date: "20 Jan 2024" }
      ]
    },
    { 
      id: '3', 
      title: "Architex Portfolio", 
      category: "Creative Site", 
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200", 
      url: "https://www.apple.com/br/macbook-pro/", 
      description: "Galeria digital imersiva projetada para estúdios de arquitetura, com foco em transições cinematográficas e alta fidelidade visual.", 
      rating: 4.8,
      reviews: [
        { id: 'r4', userName: "André Z.", rating: 5, comment: "Um portfólio que respira sofisticação. Exatamente o que precisávamos.", date: "15 Dez 2023" }
      ]
    }
  ];

  useEffect(() => {
    const fetchAll = async () => {
      let cloudProjects: Project[] = [];
      
      if (isFirebaseEnabled) {
        try {
          const q = query(collection(db, "projects"), orderBy("timestamp", "desc"));
          const querySnapshot = await getDocs(q);
          cloudProjects = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
            reviews: doc.data().reviews || [] // Garante que reviews existam
          })) as Project[];
        } catch (error) {
          console.error("Firebase fetch error:", error);
        }
      }
      
      const saved = JSON.parse(localStorage.getItem('jp_engine_custom_projects') || '[]');
      setProjects([...cloudProjects, ...saved, ...initialProjects]);
    };
    
    fetchAll();
  }, [updateTrigger]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home projects={projects} />} />
        <Route path="/admin" element={<AdminPanel projects={projects.filter(p => !initialProjects.find(ip => ip.id === p.id))} onUpdate={() => setUpdateTrigger(t => t + 1)} isFirebaseOn={isFirebaseEnabled} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
