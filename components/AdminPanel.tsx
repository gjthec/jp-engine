
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Trash2, Save, ArrowLeft, LayoutGrid, Loader2, Wand2, Sparkles 
} from 'lucide-react';
import { db, isFirebaseEnabled } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { GoogleGenAI } from '@google/genai';

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  url: string;
  description: string;
  rating: number;
}

interface AdminPanelProps {
  projects: Project[];
  onUpdate: () => void;
  isFirebaseOn: boolean;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ projects, onUpdate, isFirebaseOn }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '', category: '', image: '', url: '', description: '', rating: 5
  });

  const handleAiGenerate = async () => {
    if (!newProject.title || !newProject.category) {
      alert("Por favor, preencha o Título e a Categoria para que a IA possa gerar a especificação.");
      return;
    }

    setAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Você é um Engenheiro de Software Sênior e arquiteto de soluções na JP Engine. 
      Gere uma descrição técnica sofisticada e impactante (em português do Brasil) para um projeto web chamado "${newProject.title}" na categoria "${newProject.category}".
      O site está disponível em: ${newProject.url || 'ambiente de produção restrito'}.
      
      Diretrizes:
      - Mencione tecnologias de ponta (Next.js, React 19, Node.js, Tailwind CSS).
      - Foque em escalabilidade, performance Lighthouse 100, e UI/UX de nível premium.
      - O tom deve ser profissional, industrial e atraente para clientes de alto ticket.
      - Limite o texto a aproximadamente 150-200 caracteres para ser direto.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });

      if (response.text) {
        setNewProject(prev => ({ ...prev, description: response.text.trim() }));
      }
    } catch (error) {
      console.error("Erro na IA:", error);
      alert("Falha ao gerar especificações com IA.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const projectData = {
      title: newProject.title,
      category: newProject.category,
      image: newProject.image,
      url: newProject.url,
      description: newProject.description,
      rating: newProject.rating || 5,
    };

    if (isFirebaseOn && db) {
      try {
        await addDoc(collection(db, "projects"), { 
          ...projectData, 
          timestamp: serverTimestamp() 
        });
      } catch (e) { 
        console.error("Erro ao salvar no Firebase:", e); 
        alert("Erro ao salvar no banco de dados. Verifique a configuração.");
      }
    } else {
      const current = JSON.parse(localStorage.getItem('jp_engine_custom_projects') || '[]');
      const localProject = { ...projectData, id: Date.now().toString() };
      localStorage.setItem('jp_engine_custom_projects', JSON.stringify([...current, localProject]));
    }

    setNewProject({ title: '', category: '', image: '', url: '', description: '', rating: 5 });
    onUpdate();
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Confirmar exclusão desta engine?")) return;
    
    if (isFirebaseOn && db) {
      try { 
        await deleteDoc(doc(db, "projects", id)); 
      } catch (e) { 
        console.error("Erro ao deletar do Firebase:", e); 
      }
    } else {
      const current = JSON.parse(localStorage.getItem('jp_engine_custom_projects') || '[]');
      localStorage.setItem('jp_engine_custom_projects', JSON.stringify(current.filter((p: any) => p.id !== id)));
    }
    onUpdate();
  };

  return (
    <div className="min-h-screen bg-[#050505] p-6 md:p-12 animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all">
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tighter text-white">Engine_Control</h1>
              <p className="text-[10px] text-blue-500 font-mono tracking-widest uppercase">Gerenciamento de Ativos Digitais</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <div className={`w-2 h-2 rounded-full ${isFirebaseOn ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></div>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
              {isFirebaseOn ? 'Cloud_Active' : 'Local_Registry_Mode'}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <div className="glass p-8 rounded-[32px] sticky top-12 border-blue-500/10 shadow-[0_0_50px_rgba(37,99,235,0.05)]">
              <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                <Plus size={18} className="text-blue-500" /> Nova Engine
              </h3>
              <form onSubmit={handleSave} className="space-y-4">
                <input placeholder="Título do Projeto" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 outline-none transition-colors" required />
                <input placeholder="Segmento (Ex: E-commerce)" value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 outline-none transition-colors" required />
                <input placeholder="URL Imagem (Assets)" value={newProject.image} onChange={e => setNewProject({...newProject, image: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 outline-none transition-colors" required />
                <input placeholder="URL Site (Deployment)" value={newProject.url} onChange={e => setNewProject({...newProject, url: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 outline-none transition-colors" required />
                
                <div className="relative">
                  <textarea 
                    placeholder="Especificações técnicas..." 
                    value={newProject.description} 
                    onChange={e => setNewProject({...newProject, description: e.target.value})} 
                    className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 outline-none h-32 resize-none transition-colors pr-12" 
                    required 
                  />
                  <button 
                    type="button"
                    onClick={handleAiGenerate}
                    disabled={aiLoading}
                    title="Gerar especificações com IA"
                    className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/20 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all group"
                  >
                    {aiLoading ? <Loader2 size={14} className="animate-spin" /> : <Wand2 size={14} className="group-hover:rotate-12 transition-transform" />}
                  </button>
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 opacity-40 pointer-events-none">
                    <Sparkles size={10} className="text-blue-500" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-blue-500">Gemini AI</span>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-[0.3em] py-5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20">
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <><Save size={14} /> Registrar Engine</>}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
             <div className="mb-6 flex items-center gap-2 px-2">
                <LayoutGrid size={16} className="text-slate-500" />
                <span className="text-white font-black text-[10px] uppercase tracking-widest">Engines Customizadas ({projects.length})</span>
             </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {projects.length > 0 ? projects.map(p => (
                <div key={p.id} className="glass p-6 rounded-[24px] group border-white/5 hover:border-blue-500/20 transition-all flex flex-col bg-white/[0.01]">
                  <div className="aspect-video rounded-xl overflow-hidden mb-4 border border-white/5 bg-black">
                    <img src={p.image} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" alt="" />
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-white font-bold">{p.title}</h4>
                    <button onClick={() => handleDelete(p.id)} className="text-slate-600 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-[10px] text-blue-500/60 font-black uppercase tracking-widest mb-3">{p.category}</p>
                </div>
              )) : (
                <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-[40px]">
                   <p className="text-slate-600 font-black text-[10px] uppercase tracking-[0.5em]">Nenhuma engine cadastrada</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
