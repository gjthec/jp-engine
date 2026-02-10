
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
  X, Globe, Loader2
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  url: string;
  description: string;
  rating: number;
}

// ==========================================
// COMPONENTE HOME
// ==========================================
const Home: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const [scrolled, setScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [iframeLoading, setIframeLoading] = useState(true);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (selectedProject) setIframeLoading(true);
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
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/98 cursor-pointer backdrop-blur-xl" onClick={() => setSelectedProject(null)}></div>
          <div className="relative glass rounded-[24px] md:rounded-[40px] overflow-hidden flex flex-col w-full max-w-[1400px] h-[90vh] bg-[#080808] border border-white/10">
            <div className="bg-[#121212] border-b border-white/10 p-4 flex items-center justify-between shrink-0">
               <div className="flex items-center gap-3">
                  <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40"></div><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div><div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40"></div></div>
                  <div className="bg-black/40 rounded-full px-4 py-1.5 border border-white/5 flex items-center gap-2"><Globe size={12} className="text-slate-500" /><span className="text-xs text-slate-400 font-mono">{selectedProject.url}</span></div>
               </div>
               <button onClick={() => setSelectedProject(null)} className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white transition-all"><X size={20} /></button>
            </div>
            <div className="flex-1 relative bg-[#050505] overflow-hidden">
                {iframeLoading && <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#080808] z-20"><Loader2 className="text-blue-500 animate-spin mb-4" size={40} /></div>}
                <iframe src={selectedProject.url} className={`w-full h-full border-none ${iframeLoading ? 'opacity-0' : 'opacity-100'}`} onLoad={() => setIframeLoading(false)} title={selectedProject.title} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// COMPONENTE APP (ROOT)
// ==========================================
const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const initialProjects: Project[] = [
    { id: '1', title: "Lumina Skincare", category: "E-commerce Premium", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=1200", url: "https://demo.vercel.store", description: "Uma experiência de compra minimalista focada em luxo.", rating: 4.9 },
    { id: '2', title: "Nova Bank App", category: "Interface Fintech", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200", url: "https://stripe.com/br", description: "Simplificando finanças complexas através de UI limpa.", rating: 5.0 },
    { id: '3', title: "Architex Portfolio", category: "Creative Site", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200", url: "https://www.apple.com/br/macbook-pro/", description: "Galeria digital imersiva com transições fluidas.", rating: 4.7 }
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
            id: doc.id
          })) as Project[];
        } catch (error) {
          console.error("Firebase fetch error:", error);
        }
      }
      
      const saved = JSON.parse(localStorage.getItem('jp_engine_custom_projects') || '[]');
      // Filtra projetos salvos no localStorage que possam ter o mesmo ID que os do Firebase/Iniciais para evitar duplicatas
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
