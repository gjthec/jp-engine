
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Trash2, Save, ArrowLeft, LayoutGrid, Loader2, Wand2, Sparkles, Edit3, X 
} from 'lucide-react';
import { db, isFirebaseEnabled } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, deleteDoc, doc, updateDoc } from 'firebase/firestore';
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '', category: '', image: '', url: '', description: '', rating: 5
  });

  const resetForm = () => {
    setNewProject({ title: '', category: '', image: '', url: '', description: '', rating: 5 });
    setEditingId(null);
  };

  const handleEdit = (project: Project) => {
    setNewProject(project);
    setEditingId(project.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAiGenerate = async () => {
    if (!newProject.title || !newProject.category) {
      alert("Por favor, preencha o Título e a Categoria para que a IA possa analisar.");
      return;
    }

    setAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Você é um Engenheiro de Software Sênior na JP Engine. 
      Crie uma especificação técnica ultra-profissional e impactante para o projeto "${newProject.title}" (Categoria: ${newProject.category}).
      
      Diretrizes:
      - Mencione tecnologias como React 19, Next.js, arquitetura escalável e design atômico.
      - Fale sobre performance excepcional e experiência do usuário premium.
      - O texto deve ser conciso (máximo 180 caracteres).
      - Linguagem industrial e sofisticada.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });

      if (response.text) {
        setNewProject(prev => ({ ...prev, description: response.text.trim() }));
      }
    } catch (error) {
      console.error("Erro na IA:", error);
      alert("Falha ao gerar especificações. Verifique sua conexão ou API Key.");
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

    try {
      if (isFirebaseOn && db) {
        if (editingId) {
          await updateDoc(doc(db, "projects", editingId), projectData);
        } else {
          await addDoc(collection(db, "projects"), { 
            ...projectData, 
            timestamp: serverTimestamp() 
          });
        }
      } else {
        const current = JSON.parse(localStorage.getItem('jp_engine_custom_projects') || '[]');
        if (editingId) {
          const updated = current.map((p: any) => p.id === editingId ? { ...p, ...projectData } : p);
          localStorage.setItem('jp_engine_custom_projects', JSON.stringify(updated));
        } else {
          const localProject = { ...projectData, id: Date.now().toString() };
          localStorage.setItem('jp_engine_custom_projects', JSON.stringify([...current, localProject]));
        }
      }
      resetForm();
      onUpdate();
    } catch (e) {
      console.error("Erro ao salvar:", e);
      alert("Ocorreu um erro ao salvar os dados.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Confirmar desativação desta engine?")) return;
    
    try {
      if (isFirebaseOn && db) {
        await deleteDoc(doc(db, "projects", id)); 
      } else {
        const current = JSON.parse(localStorage.getItem('jp_engine_custom_projects') || '[]');
        localStorage.setItem('jp_engine_custom_projects', JSON.stringify(current.filter((p: any) => p.id !== id)));
      }
      onUpdate();
    } catch (e) {
      console.error("Erro ao deletar:", e);
    }
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
              <h1 className="text-2xl font-black uppercase tracking-tighter text-white">Engine_Control_Panel</h1>
              <p className="text-[10px] text-blue-500 font-mono tracking-widest uppercase">Gerenciamento de Ativos Digitais</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <div className={`w-2 h-2 rounded-full ${isFirebaseOn ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-yellow-500 animate-pulse'}`}></div>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
              {isFirebaseOn ? 'Cloud_Sync_On' : 'Local_Buffer_Mode'}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Form Side */}
          <div className="lg:col-span-1">
            <div className="glass p-8 rounded-[32px] sticky top-12 border-white/5 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-white font-bold flex items-center gap-2 uppercase tracking-widest text-xs">
                  {editingId ? <Edit3 size={16} className="text-yellow-500" /> : <Plus size={16} className="text-blue-500" />}
                  {editingId ? 'Editar Engine' : 'Nova Engine'}
                </h3>
                {editingId && (
                  <button onClick={resetForm} className="text-slate-500 hover:text-white flex items-center gap-1 text-[10px] font-black uppercase">
                    <X size={12} /> Cancelar
                  </button>
                )}
              </div>

              <form onSubmit={handleSave} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 px-1">Título da Unidade</label>
                  <input placeholder="Ex: Nova Bank" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 outline-none transition-colors" required />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 px-1">Segmento Operacional</label>
                  <input placeholder="Ex: Fintech" value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 outline-none transition-colors" required />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 px-1">Source Image (URL)</label>
                  <input placeholder="https://..." value={newProject.image} onChange={e => setNewProject({...newProject, image: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 outline-none transition-colors" required />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 px-1">Live Endpoint (URL)</label>
                  <input placeholder="https://..." value={newProject.url} onChange={e => setNewProject({...newProject, url: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 outline-none transition-colors" required />
                </div>

                <div className="space-y-1.5 relative">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-500">Especificações Técnicas</label>
                    <button 
                      type="button" 
                      onClick={handleAiGenerate}
                      disabled={aiLoading}
                      className="flex items-center gap-1.5 text-blue-500 hover:text-blue-400 transition-colors"
                    >
                      {aiLoading ? <Loader2 size={12} className="animate-spin" /> : <Wand2 size={12} />}
                      <span className="text-[9px] font-black uppercase tracking-widest">Gerar com IA</span>
                    </button>
                  </div>
                  <textarea 
                    placeholder="Descrição do sistema..." 
                    value={newProject.description} 
                    onChange={e => setNewProject({...newProject, description: e.target.value})} 
                    className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500/50 outline-none h-32 resize-none transition-colors" 
                    required 
                  />
                  <div className="absolute bottom-3 right-3 opacity-20 pointer-events-none flex items-center gap-1">
                    <Sparkles size={10} className="text-blue-400" />
                    <span className="text-[7px] font-black uppercase text-blue-400">Gemini Core</span>
                  </div>
                </div>

                <button type="submit" disabled={loading} className={`w-full ${editingId ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-blue-600 hover:bg-blue-500'} text-white font-black text-[10px] uppercase tracking-[0.3em] py-5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-900/10`}>
                  {loading ? <Loader2 size={16} className="animate-spin" /> : (
                    <>
                      <Save size={14} /> 
                      {editingId ? 'Atualizar Engine' : 'Registrar Engine'}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* List Side */}
          <div className="lg:col-span-2">
             <div className="mb-8 flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <LayoutGrid size={16} className="text-slate-500" />
                  <span className="text-white font-black text-[10px] uppercase tracking-[0.2em]">Frota_Ativa ({projects.length})</span>
                </div>
                <span className="text-slate-600 text-[9px] font-mono tracking-tighter">SYS.ADM.V4.2</span>
             </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {projects.length > 0 ? projects.map(p => (
                <div key={p.id} className="glass p-5 rounded-[24px] group border-white/5 hover:border-blue-500/20 transition-all flex flex-col bg-white/[0.01]">
                  <div className="aspect-video rounded-xl overflow-hidden mb-5 border border-white/5 bg-black relative">
                    <img src={p.image} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 flex gap-2">
                       <button onClick={() => handleEdit(p)} className="bg-white/10 backdrop-blur-md p-2 rounded-lg text-white hover:bg-blue-600 transition-all border border-white/10">
                         <Edit3 size={14} />
                       </button>
                       <button onClick={() => handleDelete(p.id)} className="bg-white/10 backdrop-blur-md p-2 rounded-lg text-white hover:bg-red-600 transition-all border border-white/10">
                         <Trash2 size={14} />
                       </button>
                    </div>
                  </div>
                  <div className="px-1">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-white font-bold text-sm tracking-tight">{p.title}</h4>
                      <div className="flex items-center gap-1">
                        <Sparkles size={10} className="text-blue-500" />
                        <span className="text-blue-500 text-[8px] font-black uppercase">{p.category}</span>
                      </div>
                    </div>
                    <p className="text-slate-500 text-[10px] leading-relaxed line-clamp-2 italic">
                      "{p.description}"
                    </p>
                  </div>
                </div>
              )) : (
                <div className="col-span-full py-24 text-center border-2 border-dashed border-white/5 rounded-[40px] bg-white/[0.01]">
                   <p className="text-slate-600 font-black text-[10px] uppercase tracking-[0.5em]">Sem Unidades Registradas</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
