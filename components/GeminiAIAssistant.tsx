
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI, Chat } from '@google/genai';

export const GeminiAIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Olá. Sou o concierge da JP Engine. Como podemos elevar a experiência digital da sua marca hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Memoize the AI instance and chat to maintain state across re-renders
  const chatInstance = useMemo(() => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    return ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `Você é o concierge da JP Engine, um estúdio de design e engenharia criativa de alta performance liderado pelo João Pedro (JP).
        
        DADOS DO JP:
        - Formação: Bacharel em Ciência da Computação pela UTFPR.
        - Experiência: 8+ anos no mercado global (Startups e Corporações).
        - Especialidade: UI/UX de Luxo, Sistemas de Alta Performance (Engines), Next.js e React.
        
        VALORES DA MARCA:
        - Industrial, Sofisticado, Técnico, Minimalista.
        - O design não é apenas estético, é engenharia visual.
        
        CONTATOS (Ofereça se o usuário demonstrar interesse em contratar ou tirar dúvidas técnicas):
        - WhatsApp: 35 99884-2525
        - Instagram: @jp_engine
        
        DIRETRIZES DE RESPOSTA:
        - Responda sempre em português.
        - Mantenha um tom profissional mas acolhedor.
        - Use termos como "elevar", "experiência digital", "performance" e "engenharia visual".
        - Se perguntarem sobre preços, diga que cada "Engine" é customizada e sugira uma breve conversa por WhatsApp para orçamento.`,
      }
    });
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const result = await chatInstance.sendMessage({ message: userMsg });
      const botText = result.text || 'Desculpe, tive um breve lapso na minha rede. Pode repetir?';
      
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: 'Detectei uma instabilidade na conexão. Para garantir o melhor atendimento, você pode falar diretamente com o JP no WhatsApp: 35 99884-2525' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:scale-110 transition-all active:scale-95 group relative"
        >
          <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-20 group-hover:opacity-40"></div>
          <MessageSquare className="w-7 h-7 relative z-10" />
        </button>
      )}

      {isOpen && (
        <div className="w-[350px] md:w-[420px] h-[600px] bg-[#080808] border border-white/10 rounded-[32px] flex flex-col shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 overflow-hidden">
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02] backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                <Sparkles size={20} />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm tracking-tight">Concierge JP</h4>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[9px] text-blue-400 font-black uppercase tracking-widest">Ativo</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-all">
              <X size={18} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.05),transparent)]">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[85%] p-4 rounded-[24px] text-sm leading-relaxed ${
                  m.role === 'user' 
                  ? 'bg-blue-600 text-white font-medium rounded-tr-none' 
                  : 'bg-white/[0.03] border border-white/5 text-slate-300 rounded-tl-none'
                }`}>
                   {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-white/[0.03] border border-white/5 p-4 rounded-[24px] rounded-tl-none flex items-center gap-2">
                  <Loader2 size={14} className="text-blue-500 animate-spin" />
                  <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Processando...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-black">
            <div className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-3 focus-within:border-blue-500/50 transition-all">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Como posso ajudar?"
                className="flex-1 bg-transparent border-none text-white text-sm focus:outline-none placeholder:text-slate-700"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="w-8 h-8 flex items-center justify-center text-white disabled:opacity-10 hover:text-blue-500 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-center text-[8px] text-slate-700 uppercase font-black tracking-widest mt-4">
              AI Powered by Gemini Engine v3
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
